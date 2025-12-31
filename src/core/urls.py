from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import CategorieViewSet, LocationViewSet, ProductViewSet
router = DefaultRouter()
router.register(r'categories', CategorieViewSet, basename='categories')
router.register(r'locations', LocationViewSet, basename='locations')
router.register(r'products', ProductViewSet, basename='products')
urlpatterns = [
    path('', include(router.urls)),
]