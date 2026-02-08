from django.db import models
from users.models import User
from django.utils.translation import gettext_lazy as _

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
    # ------------------------------
    #         About Saler          |
    # ------------------------------
    saler_name = models.CharField(max_length=250)
    saler_location = models.ForeignKey(
        Location, related_name="location", on_delete=models.CASCADE
    )
    saler_email = models.CharField(max_length=250)
    saler_telegram_url = models.URLField(max_length=200)
    saler_phone = models.CharField(
        _("Saler Phone"), blank=True, null=True, max_length=50
    )

    # ----------------------------------
    #       Aditional Info and Status   |
    # ----------------------------------
    status = models.CharField(max_length=50, choices=STATUS_CHOICE)
    is_sold = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now=True)
    """
    Add the following fields to the Extra Feature model:
    - start_date: The date when the feature becomes active (posted).
    - end_date: The date when the feature should be removed from the front page.
    """

    def __str__(self):
        return self.name

    class Meta:
        db_table = ""
        managed = True
        verbose_name = "Product"
        verbose_name_plural = "Products"


# ---------------------------------------
#       Product Gallery                 |
# ----------------------------------------


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        verbose_name=_("Product"),
        related_name="images",
        on_delete=models.CASCADE,
    )
    image = models.ImageField(_("Image"), upload_to="product/images/")
    is_main = models.BooleanField(_("Is Main"), default=False)
    order = models.PositiveIntegerField(default=0)
    alt_text = models.TextField(_("Alt Text"))
    created_at = models.DateField(_("Created At"), auto_now_add=True)
    updated_at = models.DateField(_("Created At"), auto_now =True)
    def __str__(self):
        return f"Image of {self.product.name}-{self.alt_text}"

    class Meta:
        db_table = ""
        managed = True
        verbose_name = "ProductImage"
        verbose_name_plural = "ProductImages"
        ordering = ["order"]
