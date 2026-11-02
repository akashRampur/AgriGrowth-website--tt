from django.core.management.base import BaseCommand
from core.models import ProductCode

class Command(BaseCommand):
    help = 'Seeds the database with initial demo product codes'

    def handle(self, *args, **kwargs):
        codes_data = [
            {'code': 'AG-HUMI-1001', 'product': 'Humistar', 'batch': 'Batch #AGH-2601', 'mfg': 'Jan 2026', 'exp': 'Dec 2028', 'pack_size': '500 ml', 'scan_count': 0, 'first_verified_at': None},
            {'code': 'AG-BHOO-2002', 'product': 'Bhoomistar', 'batch': 'Batch #AGB-2604', 'mfg': 'Feb 2026', 'exp': 'Jan 2029', 'pack_size': '4 kg', 'scan_count': 0, 'first_verified_at': None},
            {'code': 'AG-SHLD-5500', 'product': 'AgriShield Duo', 'batch': 'Batch #AGS-2511', 'mfg': 'Nov 2025', 'exp': 'Oct 2027', 'pack_size': '250 ml', 'scan_count': 1, 'first_verified_at': '12 Oct 2026, 11:20 AM'},
        ]
        
        for data in codes_data:
            ProductCode.objects.get_or_create(code=data['code'], defaults=data)
            
        self.stdout.write(self.style.SUCCESS('Successfully seeded demo product codes'))
