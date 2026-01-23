from django.contrib import admin
from .models import Location,Category,Product

# Register your models here.
admin.site.register(Location)
admin.site.register(Category)
admin.site.register(Product)