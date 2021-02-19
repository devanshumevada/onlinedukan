from django.shortcuts import render


from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from base import models
from base import serializers

@api_view(['GET'])
def get_products(request):
        products = models.Product.objects.all()
        serialized_data = serializers.product_serializer(products, many=True)
        return Response(serialized_data.data)

@api_view(['GET'])
def get_product(request, _id):
        product = models.Product.objects.get(_id=_id)
        serialized_data = serializers.product_serializer(product, many=False)
        return Response(serialized_data.data)
