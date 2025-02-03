from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import RegisterSerializer, LoginSerializer, ProfileSerializer
from .models import Profile


class RegisterView(generics.CreateAPIView):
    """
    사용자 회원가입 API
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="회원가입 (POST 요청만 지원)"
    )
    def get(self, request, *args, **kwargs):
        return Response(
            {"message": "GET method is not supported for registration."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    @swagger_auto_schema(
        operation_summary="회원가입 요청",
        responses={201: "User registered successfully", 400: "Bad Request"}
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            profile = Profile.objects.get(user=user)

            return Response(
                {
                    "message": "User registered successfully.",
                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "phonenumber": profile.phonenumber,
                        "birthday": profile.birthday,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError as e:
            if "users_profile.phonenumber" in str(e):
                return Response(
                    {"error": "The phone number is already registered."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            raise e


class LoginView(generics.GenericAPIView):
    """
    사용자 로그인 API
    """
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="로그인 (POST 요청만 지원)"
    )
    def get(self, request):
        return Response(
            {"message": "Send POST request with username and password to log in."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    @swagger_auto_schema(
        operation_summary="로그인 요청",
        responses={200: "Login successful", 400: "Invalid credentials"}
    )
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data  # Ensure token is a Token object

        return Response(
            token,
            status=status.HTTP_200_OK,
        )


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    사용자 프로필 조회 및 수정 API
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="사용자 프로필 조회 (로그인 필요)"
    )
    def get_queryset(self):
        """
        비로그인 사용자 및 Swagger 문서 생성을 위한 예외 처리
        """
        if getattr(self, 'swagger_fake_view', False):
            return Profile.objects.none()

        if self.request.user.is_anonymous:
            return Profile.objects.none()

        return Profile.objects.filter(user=self.request.user)
