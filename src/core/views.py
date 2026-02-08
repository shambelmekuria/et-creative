from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Category, Location, Product,ProductImage
from .serializers import CategorySerializer, LocationSerializer, ProductSerializer,ProductImageSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser,FormParser

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    # Override get_queryset to filter products by the authenticated user
    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)

class ProductImageViewSet(ModelViewSet):
    parser_classes = [MultiPartParser,FormParser]
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticated]
    queryset = ProductImage.objects.all()
    # def get_queryset(self):
    #     return ProductImage.objects.filter(product__owner=self.request.user)
    
