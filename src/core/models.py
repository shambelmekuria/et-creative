from django.db import models
from users.models import User

# Create your models here.

# --------------------------
#    Products Categories  |
# -------------------------
class Category(models.Model):
    name = models.CharField(max_length=250)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name = "Categorie"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


# --------------------------
#       Location          |
# -------------------------
class Location(models.Model):
    name = models.CharField(max_length=250)
    region = models.CharField(max_length=250, null=True, blank=True)
    zone = models.CharField(max_length=250, null=True, blank=True)
    wereda = models.CharField(max_length=250, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Location"
        verbose_name_plural = "Locations"

    def __str__(self):
        return self.name


STATUS_CHOICE = (
    ("pending", "Pending"),
    ("approved", "Aproved"),
    ("rejected", "Rejected"),
)


class Product(models.Model):
    # ---------------------------
    #  --  About Products  -----|
    # ---------------------------
    owner = models.ForeignKey(
        User, related_name="user", on_delete=models.CASCADE
    )  # creator for Products
    name = models.CharField(max_length=250)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    code = models.CharField(max_length=50)
    featured_image = models.ImageField(upload_to="featured-image/")
    product_gallery = models.ImageField(upload_to="product-gallery/")

    # ------------------------------
    #         About Saler          |
    # ------------------------------
    saler_name = models.CharField(max_length=250)
    saler_location = models.ForeignKey(Location, related_name='location', on_delete=models.CASCADE)
    saler_email = models.CharField(max_length=250)
    saler_telegram_url = models.URLField(max_length=200)

    # ----------------------------------
    #       Aditional Info and Status   |
    # ----------------------------------
    status = models.CharField(max_length=50, choices=STATUS_CHOICE)
    is_sold = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = ""
        managed = True
        verbose_name = "Product"
        verbose_name_plural = "Products"