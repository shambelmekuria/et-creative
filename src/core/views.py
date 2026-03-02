from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Category, Location, Product, ProductImage
from .serializers import (
    CategorySerializer,
    LocationSerializer,
    ProductSerializer,
    ProductImageSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status


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
    
    def update(self, request, *args, **kwargs):
        print("Request...",request.data)
        return super().update(request, *args, **kwargs)
    # Override get_queryset to filter products by the authenticated user
    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)


class ProductImageViewSet(ModelViewSet):
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticated]
    queryset = ProductImage.objects.all()
    
    # def get_queryset(self):
    #     return ProductImage.objects.filter(product__owner=self.request.user)


# dashboard
@permission_classes(IsAuthenticated)
@api_view(("GET",))
def dashboard(request):
    try:
        total_product = Product.objects.count()
        pending_product = Product.objects.filter(status="pending").count()
        approved_product = Product.objects.filter(status="approved").count()
        rejected_product = Product.objects.filter(status="rejected").count()
        is_sold = Product.objects.filter(is_sold=True).count()
        product_count = {
            "pending": pending_product,
            "approved": approved_product,
            "rejected": rejected_product,
            "is_sold": is_sold,
        }
        return Response(
            {"total_product": total_product, "product_status": product_count},
            status=status.HTTP_200_OK,
        )
    except:
        return Response(
            {"error": "token expired or unauhorized users"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
def index(request):
    recent_products = Product.objects.prefetch_related("images").filter(is_sold=False,status="approved")[:6]
    data = []
    for product in recent_products:
        first_image = product.images.filter(is_main=True).first()
        data.append(
            {
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "code": product.code,
                "saler_name": product.saler_name,
                "saler_phone":product.saler_phone,
                "saler_telegram_username":product.seller_telegram_username,
                "saler_email":product.saler_email,
                "saler_location": f"{product.saler_location.name}-{product.saler_location.region}",
                "featured_image": first_image.image.url if first_image else None,
                "images": [img.image.url for img in product.images.all()],
            }
        )
    return Response(
        {"recent_product": data},
        status=status.HTTP_200_OK,
    )
