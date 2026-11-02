from django.contrib import admin
from .models import ProductCode, Lead, CropPractice, KnowledgeArticle, Product

@admin.register(ProductCode)
class ProductCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'product', 'batch', 'scan_count', 'first_verified_at')
    search_fields = ('code', 'product', 'batch')
    list_filter = ('product',)

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    # Yahan 'email', 'address', aur 'message' ko list_display mein add kar diya gaya hai
    list_display = ('lead_id', 'type', 'name', 'phone', 'email', 'address', 'message', 'created_at')
    list_filter = ('type', 'created_at')
    search_fields = ('lead_id', 'name', 'phone', 'email')

admin.site.register(CropPractice)

@admin.register(KnowledgeArticle)
class KnowledgeArticleAdmin(admin.ModelAdmin):
    list_display = ('card_number', 'heading', 'category', 'slug_name')
    prepopulated_fields = {'slug_name': ('heading',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('brand_name', 'category', 'suitable_crops', 'packing_size', 'dose')
    list_filter = ('category',)
    search_fields = ('brand_name', 'suitable_crops')