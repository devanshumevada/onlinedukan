from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, ShippingAddress

class product_serializer(serializers.ModelSerializer):
        class Meta:
                model = Product
                fields = '__all__'


class user_serializer(serializers.ModelSerializer):
        name = serializers.SerializerMethodField(read_only=True)
        _id = serializers.SerializerMethodField(read_only=True)
        is_admin  = serializers.SerializerMethodField(read_only=True)
        class Meta:
                model = User
                fields = ['_id','username','email','name','is_admin']

        def get_name(self,obj):
                name = obj.first_name
                if name == '':
                        name = obj.email
                return name

        def get_is_admin(self, obj):
                return obj.is_staff

        def get__id(self, obj):
                return obj.id


class user_serializer_with_token(user_serializer):
        token = serializers.SerializerMethodField(read_only=True)

        class Meta:
                model = User
                fields = ['_id','username','email','name','is_admin','token']

        def get_token(self, obj):
                token = RefreshToken.for_user(obj)
                return str(token.access_token)


class order_item_serializer(serializers.ModelSerializer):
        class Meta:
                model = OrderItem
                fields = '__all__'

class shipping_address_serializer(serializers.ModelSerializer):
        class Meta:
                model = ShippingAddress
                fields = '__all__'


class order_serializer(serializers.ModelSerializer):
        order_items = serializers.SerializerMethodField(read_only=True)
        shipping_address = serializers.SerializerMethodField(read_only=True)
        user = serializers.SerializerMethodField(read_only=True)
        class Meta:
                model = Order
                fields = '__all__'

        def get_order_items(self,obj):
                items = obj.orderitem_set.all()
                serialized_data = order_item_serializer(items, many=True)
                return serialized_data.data

        def get_shipping_address(self,obj):
                try:
                        address = shipping_address_serializer(obj.shippingaddress, many=False).data
                        
                except Exception:
                        address = False
                
                return address

        def get_user(self,obj):
                user = obj.user
                serialized_user = user_serializer(user, many=False)
                return serialized_user.data



