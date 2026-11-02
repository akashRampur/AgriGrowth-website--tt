from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.shortcuts import render, get_object_or_404
import json
import random

# Saare models ko ek hi baar import karna hai
from .models import ProductCode, Lead, CropPractice, KnowledgeArticle, Product

# Ek hi Home function jisme products aur articles dono pass kiye gaye hain
def home(request):
    articles = KnowledgeArticle.objects.all()
    products = Product.objects.all()
    
    context = {
        'articles': articles,
        'products': products
    }
    # Agar aapki main file admin.html hai toh yahan 'admin.html' likhein, warna 'index.html'
    return render(request, 'index.html', context) 

def admin_dashboard(request):
    return render(request, 'admin.html')

@csrf_exempt
def verify_code(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            code = data.get('code', '').strip().upper()
            product = data.get('product', '').strip()

            if not code:
                return JsonResponse({'status': 'error', 'message': 'Code required'}, status=400)

            try:
                prod_code = ProductCode.objects.get(code=code)
            except ProductCode.DoesNotExist:
                return JsonResponse({'status': 'fake', 'code': code})

            # Security Check
            if product and prod_code.product.lower() != product.lower():
                return JsonResponse({
                    'status': 'mismatch',
                    'code': code,
                    'selectedProduct': product,
                    'actualProduct': prod_code.product
                })

            now_formatted = timezone.localtime().strftime('%d %b %Y, %I:%M %p')

            if prod_code.scan_count == 0:
                prod_code.scan_count = 1
                prod_code.first_verified_at = now_formatted
                prod_code.save()
                return JsonResponse({
                    'status': 'genuine',
                    'code': code,
                    'product': prod_code.product,
                    'batch': prod_code.batch,
                    'mfg': prod_code.mfg,
                    'exp': prod_code.exp,
                    'packSize': prod_code.pack_size,
                    'firstVerifiedAt': now_formatted,
                    'scanCount': 1
                })
            else:
                prod_code.scan_count += 1
                prod_code.save()
                return JsonResponse({
                    'status': 'already_verified',
                    'code': code,
                    'product': prod_code.product,
                    'batch': prod_code.batch,
                    'packSize': prod_code.pack_size,
                    'firstVerifiedAt': prod_code.first_verified_at,
                    'scanCount': prod_code.scan_count
                })
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def submit_lead(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            type_str = data.get('type', 'GEN')
            prefix = type_str[:3].upper()
            lead_id = f"AG-{prefix}-{random.randint(1000, 9999)}"

            # Yahan address bhi add kar diya gaya hai taaki wo DB mein save ho
            lead = Lead.objects.create(
                lead_id=lead_id,
                type=type_str,
                name=data.get('name', ''),
                business=data.get('business', ''),
                phone=data.get('phone', '') or data.get('mobile', ''), # Form se mobile ya phone jo bhi aaye
                email=data.get('email', ''),
                address=data.get('address', ''), # Address save karne ki line
                message=data.get('message', '')
            )
            return JsonResponse({'success': True, 'leadId': lead.lead_id})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def reset_demo(request):
    if request.method == 'POST':
        ProductCode.objects.filter(code__in=['AG-HUMI-1001', 'AG-BHOO-2002']).update(scan_count=0, first_verified_at=None)
        ProductCode.objects.filter(code='AG-SHLD-5500').update(scan_count=1, first_verified_at='12 Oct 2026, 11:20 AM')
        return JsonResponse({'success': True})
    return JsonResponse({'success': False}, status=405)

def get_leads(request):
    leads = list(Lead.objects.all().order_by('-id').values())
    return JsonResponse(leads, safe=False)

def get_codes(request):
    codes = list(ProductCode.objects.all().order_by('-scan_count').values())
    return JsonResponse(codes, safe=False)

@csrf_exempt
def add_code(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            ProductCode.objects.create(
                code=data['code'],
                product=data['product'],
                batch=data['batch'],
                mfg=data['mfg'],
                exp=data['exp'],
                pack_size=data['packSize']
            )
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    return JsonResponse({'success': False})

def crop_details_view(request, crop_name):
    crop = get_object_or_404(CropPractice, slug_name__iexact=crop_name)
    return render(request, 'crop_details.html', {'crop': crop})

def knowledge_detail_view(request, slug_name):
    article = get_object_or_404(KnowledgeArticle, slug_name__iexact=slug_name.strip())
    return render(request, 'knowledge_details.html', {'article': article})