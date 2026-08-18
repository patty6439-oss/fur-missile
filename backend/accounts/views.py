from django.conf import settings 

from django.contrib.auth import authenticate 

from rest_framework import status 

from rest_framework.permissions import AllowAny, IsAuthenticated 

from rest_framework.response import Response 

from rest_framework.views import APIView 

from rest_framework_simplejwt.tokens import RefreshToken 

  

from .models import User 

  

  

def user_payload(user): 

    return { 

        "id": user.id, 

        "email": user.email, 

        "username": user.username, 

    } 

  

  

def set_refresh_cookie(response, refresh_token): 

    response.set_cookie( 

        key=settings.AUTH_COOKIE_NAME, 

        value=str(refresh_token), 

        max_age=settings.AUTH_COOKIE_MAX_AGE, 

        httponly=settings.AUTH_COOKIE_HTTP_ONLY, 

        secure=settings.AUTH_COOKIE_SECURE, 

        samesite=settings.AUTH_COOKIE_SAMESITE, 

    ) 

  

  

class Register(APIView): 

    permission_classes = [AllowAny] 

    authentication_classes = [] 

  

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

  

        refresh = RefreshToken.for_user(user) 

        response = Response( 

            { 

                "user": user_payload(user), 

                "access": str(refresh.access_token), 

            }, 

            status=status.HTTP_201_CREATED, 

        ) 

        set_refresh_cookie(response, refresh) 

        return response 

  

  

class Login(APIView): 

    permission_classes = [AllowAny] 

    authentication_classes = [] 

  

    def post(self, request): 

        email = request.data.get("email") 

        password = request.data.get("password") 

  

        user = authenticate( 

            request, 

            username=email, 

            password=password, 

        ) 

  

        if user is None: 

            return Response( 

                {"error": "Invalid email or password."}, 

                status=status.HTTP_400_BAD_REQUEST, 

            ) 

  

        refresh = RefreshToken.for_user(user) 

        response = Response( 

            { 

                "user": user_payload(user), 

                "access": str(refresh.access_token), 

            } 

        ) 

        set_refresh_cookie(response, refresh) 

        return response 

  

  

class Refresh(APIView): 

    permission_classes = [AllowAny] 

    authentication_classes = [] 

  

    def post(self, request): 

        token = request.COOKIES.get(settings.AUTH_COOKIE_NAME) 

  

        if not token: 

            return Response( 

                {"error": "Refresh token is missing."}, 

                status=status.HTTP_401_UNAUTHORIZED, 

            ) 

  

        try: 

            refresh = RefreshToken(token) 

            access = str(refresh.access_token) 

        except Exception: 

            return Response( 

                {"error": "Refresh token is invalid or expired."}, 

                status=status.HTTP_401_UNAUTHORIZED, 

            ) 

  

        return Response({"access": access}) 

  

  

class Logout(APIView): 

    permission_classes = [AllowAny] 

    authentication_classes = [] 

  

    def post(self, request): 

        response = Response({"message": "Logged out."}) 

        response.delete_cookie( 

            settings.AUTH_COOKIE_NAME, 

            samesite=settings.AUTH_COOKIE_SAMESITE, 

        ) 

        return response 

  

  

class Info(APIView): 

    permission_classes = [IsAuthenticated] 

  

    def get(self, request): 

        return Response({"user": user_payload(request.user)}) 