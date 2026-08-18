from django.contrib.auth import authenticate 
from rest_framework.authtoken.models import Token 
from rest_framework.authentication import TokenAuthentication 
from rest_framework.permissions import AllowAny, IsAuthenticated 
from rest_framework.response import Response 
from rest_framework.views import APIView 
from rest_framework import status 
 
from .models import User 
 
 
class Register(APIView): 
    permission_classes = [AllowAny] 
 
    def post(self, request): 
        email = request.data.get("email") 
        username = request.data.get("username") or email 
        password = request.data.get("password") 
 
        if not email or not password: 
            return Response( 
                {"error": "Email and password are required."}, 
                status=status.HTTP_400_BAD_REQUEST, 
            ) 
 
        if User.objects.filter(email=email).exists(): 
            return Response( 
                {"error": "A user with that email already exists."}, 
                status=status.HTTP_400_BAD_REQUEST, 
            ) 
 
        user = User.objects.create_user( 
            email=email, 
            username=username, 
            password=password, 
        ) 
        token, _ = Token.objects.get_or_create(user=user) 
 
        return Response( 
            { 
                "user": { 
                    "id": user.id, 
                    "email": user.email, 
                    "username": user.username, 
                }, 
                "token": token.key, 
            }, 
            status=status.HTTP_201_CREATED, 
        ) 
 
 
class Login(APIView): 
    permission_classes = [AllowAny] 
 
    def post(self, request): 
        email = request.data.get("email") 
        password = request.data.get("password") 
 
        user = authenticate(request, username=email, password=password) 
 
        if user is None: 
            return Response( 
                {"error": "Invalid email or password."}, 
                status=status.HTTP_400_BAD_REQUEST, 
            ) 
 
        token, _ = Token.objects.get_or_create(user=user) 
 
        return Response({ 
            "user": { 
                "id": user.id, 
                "email": user.email, 
                "username": user.username, 
            }, 
            "token": token.key, 
        }) 
 
 
class Logout(APIView): 
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated] 
 
    def post(self, request): 
        request.user.auth_token.delete() 
        return Response({"message": "Logged out."}) 
 
 
class Info(APIView): 
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated] 
 
    def get(self, request): 
        return Response({ 
            "user": { 
                "id": request.user.id, 
                "email": request.user.email, 
                "username": request.user.username, 
            } 
        })
