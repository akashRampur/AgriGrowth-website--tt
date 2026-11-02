from django.db import models

class ProductCode(models.Model):
    code = models.CharField(max_length=50, unique=True, primary_key=True)
    product = models.CharField(max_length=150)
    batch = models.CharField(max_length=100)
    mfg = models.CharField(max_length=50)
    exp = models.CharField(max_length=50)
    pack_size = models.CharField(max_length=50)
    scan_count = models.IntegerField(default=0)
    first_verified_at = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.product} - {self.code}"

class Lead(models.Model):
    TYPE_CHOICES = [
        ('DEALER', 'Dealer'),
        ('FARMER', 'Farmer'),
        ('CAREER', 'Career'),
        ('CONTACT', 'Contact'),
        ('GEN', 'General')
    ]
    
    lead_id = models.CharField(max_length=50, unique=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    name = models.CharField(max_length=150, blank=True, null=True)
    business = models.CharField(max_length=150, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.CharField(max_length=500, blank=True, null=True) # Yeh naya add kiya gaya hai
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.lead_id} ({self.type})"

class CropPractice(models.Model):
    slug_name = models.CharField(max_length=50, unique=True, help_text="Example: rice, wheat")
    title = models.CharField(max_length=200)
    package_and_practices = models.TextField(help_text="Yahan crop ki poori details daalein")

    def __str__(self):
        return self.title


class KnowledgeArticle(models.Model):
    card_number = models.CharField(max_length=10, default="01", help_text="Example: 01, 02, 03")
    slug_name = models.SlugField(max_length=100, unique=True, help_text="URL ke liye naam (bina space ke), jaise: soil-health")
    category = models.CharField(max_length=100, help_text="Example: SOIL HEALTH, CROP PROTECTION")
    heading = models.CharField(max_length=200, help_text="Card aur Article ki main heading")
    short_description = models.TextField(help_text="Card ke upar dikhne wala chhota text (2 lines)")
    image = models.ImageField(upload_to='knowledge_hub/', blank=True, null=True, help_text="Card aur article ke liye photo upload karein")
    icon = models.CharField(max_length=20, default="🌱", blank=True, help_text="Agar photo nahi lagani toh emoji daalein (jaise 🌱, 🛡️)")
    inner_text = models.TextField(help_text="Jab user click karega toh naye page par dikhne wala poora detailed article")

    class Meta:
        ordering = ['card_number']

    def __str__(self):
        return f"{self.card_number} - {self.heading}"

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('bio-stimulant', 'Bio Stimulants'),
        ('crop-protection', 'Crop Protection'),
        ('soil-health', 'Soil Health'),
        ('growth-promoter', 'Growth Promoters'),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, help_text="Filter ke liye category chunein")
    brand_name = models.CharField(max_length=150, help_text="Example: Humistar, Bhoomistar")
    tagline = models.CharField(max_length=150, blank=True, null=True, help_text="Pack box ke neeche ka chhota text (jaise: Soil Health Conditioner)")
    image = models.ImageField(upload_to='products/', blank=True, null=True, help_text="Product ki photo upload karein (agar photo nahi hogi toh default box dikhega)")
    short_info = models.TextField(help_text="Product ke baare mein 2-3 line ki jankari")
    suitable_crops = models.CharField(max_length=250, help_text="Example: Paddy, Wheat, Vegetables")
    packing_size = models.CharField(max_length=200, help_text="Example: 250 ml, 500 ml, 1 L")
    dose = models.CharField(max_length=200, help_text="Example: 2 ml per Litre of water / 500 ml per Acre")

    def __str__(self):
        return f"{self.brand_name} ({self.get_category_display()})"