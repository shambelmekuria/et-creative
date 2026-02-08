from rest_framework.serializers import ModelSerializer
from .models import Category, Location, Product, ProductImage
from rest_framework import serializers


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductImageSerializer(ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"





class ProductSerializer(ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    saler_location = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(), write_only=True
    )
    saler_location_detail = LocationSerializer(source="saler_location", read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "owner",
            "name",
            "description",
            "price",
            "code",
            "saler_name",
            "saler_location",
            "saler_location_detail",
            'images',
            "saler_email",
            "saler_phone",
            "saler_telegram_url",
            "status",
            "is_sold",
            "created_at",
            "update_at",
        ]
        read_only_fields = ["images", "created_at", "update_at"]
