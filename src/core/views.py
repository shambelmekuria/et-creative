from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Categorie, Location, Product
from .serializers import CategorieSerializer, LocationSerializer, ProductSerializer
from rest_framework.permissions import IsAuthenticated

class CategorieViewSet(ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
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
