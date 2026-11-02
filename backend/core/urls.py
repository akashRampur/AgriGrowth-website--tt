from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('index.html', views.home, name='home_html'),
    path('admin.html', views.admin_dashboard, name='admin_html'),
    path('admin-panel/', views.admin_dashboard, name='admin_dashboard'),
    path('api/verify/', views.verify_code, name='verify_code'),
    path('api/verify', views.verify_code),
    path('api/leads/', views.submit_lead, name='submit_lead'),
    path('api/leads', views.submit_lead),
    path('api/reset-demo/', views.reset_demo, name='reset_demo'),
    path('api/reset-demo', views.reset_demo),
    path('api/admin/leads/', views.get_leads, name='get_leads'),
    path('api/admin/leads', views.get_leads),
    path('api/admin/codes/', views.get_codes, name='get_codes'),
    path('api/admin/codes', views.get_codes),
    path('api/admin/add-code/', views.add_code, name='add_code'),
    path('api/admin/add-code', views.add_code),
    
    # Naya path for Crop Details
    path('crop-details/<str:crop_name>/', views.crop_details_view, name='crop_details'),
    path('knowledge-hub/<str:slug_name>/', views.knowledge_detail_view, name='knowledge_details'),
]

