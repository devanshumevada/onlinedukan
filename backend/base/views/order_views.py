from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
import os

from base import models
from base import serializers

from datetime import date, datetime
from backend import config

import razorpay

razorpay_client = razorpay.Client(auth=(config.RAZORPAY_KEY, config.RAZORPAY_SECRET))



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def razorpay_order_creation(request):
        print(request.data['amount'])
        print(request.data['order_id'])
        user = request.user
        print(user.username)
        order_data = {
                'amount': float(request.data['amount'])*100,
                'currency': 'INR',
                'receipt': f'order_{request.data["order_id"]}',
                'payment_capture': 1
        }

        response = razorpay_client.order.create(data=order_data)
        return Response({'details': response})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
        user = request.user 
        data = request.data
        order_items = data['order_items']

        if order_items and len(order_items) == 0:
                return Response({'detail':'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
                # Creating the order
                order = models.Order.objects.create(
                        user = user,
                        payment_method = data['payment_method'],
                        tax_price = data['tax_price'],
                        shipping_price = data['shipping_price'],
                        total_price = data['total_price']
                )

                # Creating a shipping address

                shipping = models.ShippingAddress.objects.create(
                        order = order,
                        address = data['shipping_address']['address'],
                        city = data['shipping_address']['city'],
                        pin_code = data['shipping_address']['pin_code'],
                        state = data['shipping_address']['state']
                )

                # adding order items

                for item in order_items:
                        product = models.Product.objects.get(_id=item['product'])

                        order_item = models.OrderItem.objects.create(
                                product = product,
                                order = order,
                                name = product.name,
                                qty = item['qty'],
                                price = item['price'],
                                image = product.image.url

                        )

                        product.countInStock -= item['qty']
                        product.save()

                serialized_data = serializers.order_serializer(order, many=False)
                return Response(serialized_data.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
        user = request.user
        orders = user.order_set.all()
        serialized_data = serializers.order_serializer(orders, many=True)
        return Response(serialized_data.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, order_id):
        user = request.user
        order = models.Order.objects.get(_id=order_id)

        try:
                if user.is_staff or order.user == user:
                        serialized_data = serializers.order_serializer(order, many=False)
                        return Response(serialized_data.data)
                else:
                        Response({'detail': 'Not authorized to view the order'}, status=status.HTTP_401_UNAUTHORIZED)
                
        except Exception:
                return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, order_id):
        order = models.Order.objects.get(_id=order_id)
        order.razorpay_payment_id = request.body.decode('utf-8')
        order.is_paid = True
        order.paid_at = datetime.now()
        order.save()
        return Response('Order was paid')
