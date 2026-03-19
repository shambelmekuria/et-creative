from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, LocationViewSet, ProductViewSet,ProductImageViewSet,dashboard,index,product_list,product_detail
router = DefaultRouter()
router.register(r'category', CategoryViewSet, basename='categorie')
router.register(r'location', LocationViewSet, basename='location')
router.register(r'product', ProductViewSet, basename='product')
router.register(r'product-image', ProductImageViewSet, basename='product-image')
urlpatterns = [
    path('', include(router.urls)),
    path("dashboard/", dashboard, name="dashboard"),
    path("index/", index, name="index"),
    path("product-list/", product_list, name="product-list"),
    path("product-detail/<str:pk>/", product_detail, name="product-detail"),
]