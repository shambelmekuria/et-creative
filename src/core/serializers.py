from rest_framework.serializers import ModelSerializer
from .models import Category, Location, Product
from rest_framework import serializers

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class ProductSerializer(ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Product
        fields = [
            'id', 'owner', 'name', 'description', 'price', 'code', 'saler_name', 'saler_location', 
            'saler_email', 'saler_telegram_url', 'status', 'is_sold', 
            'created_at', 'update_at'
        ]
        read_only_fields = ['created_at', 'update_at']