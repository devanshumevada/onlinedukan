from django.shortcuts import render
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.state import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from base import serializers


#User Routes

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
        def validate(self, attrs):
                data = super().validate(attrs)
                serialized_data = serializers.user_serializer_with_token(self.user).data
                for key, value in serialized_data.items():
                        data[key] = value
                return data

class MyTokenObtainPairView(TokenObtainPairView):
        serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register_user(request):
        data = request.data
        try:
                user = User.objects.create(
                        first_name = data['name'],
                        username = data['email'],
                        email = data['email'],
                        password = make_password(data['password'])

                )

                serialized_data = serializers.user_serializer_with_token(user, many=False)
                return Response(serialized_data.data)

        except Exception as e:
                message = {'detail':'User with this email already exists'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
        user = request.user
        serialized_data = serializers.user_serializer_with_token(user, many=False)

        data = request.data

        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']

        if data['password']:
                user.password = make_password(data['password'])
                
        user.save()
        return Response(serialized_data.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
        user = request.user
        serialized_data = serializers.user_serializer(user, many=False)
        return Response(serialized_data.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
        users = User.objects.all()
        serialized_data = serializers.user_serializer(users, many=True)
        return Response(serialized_data.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, user_id):
        user_to_delete = User.objects.get(id = user_id)
        user_to_delete.delete()
        return Response('User was deleted')



