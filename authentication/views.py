from django.shortcuts import render
from authentication.models import MyUser
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.permissions import AllowAny


class CreateUserView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            is_admin = serializer.validated_data.get('role') == 'admin'
            user = serializer.save()
            message = "admin created successfully" if is_admin else "user created successfully"
            return Response(
                {
                    'message': message,
                    'user': serializer.data,   
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        users = UserSerializer(MyUser.objects.all(), many=True)
        return Response({
            'message': "users retrieved successfully",
            'users': users.data
        })
        
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access = AccessToken.for_user(user)
            serializer = UserSerializer(user)
            return Response({
                'message': "login successful",
                'user': serializer.data,
                'tokens': {
                    'access': str(access),
                    'refresh': str(refresh),
                }
            
            }, status=status.HTTP_200_OK)
            
        return Response({
            'message': "invalid credentials"
        }, status=status.HTTP_401_UNAUTHORIZED)
