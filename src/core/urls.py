from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, LocationViewSet, ProductViewSet
router = DefaultRouter()
router.register(r'category', CategoryViewSet, basename='categorie')
router.register(r'location', LocationViewSet, basename='location')
router.register(r'product', ProductViewSet, basename='product')
urlpatterns = [
    path('', include(router.urls)),
]