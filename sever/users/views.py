from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer, LoginSerializer, ProfileSerializer
from .models import Profile

User = get_user_model()  # ✅ CustomUser 사용

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)

            existing_user = User.objects.filter(userId=request.data.get("userId")).first()
            if existing_user:
                print(f"⚠️ 기존 userId {existing_user.userId} 삭제")
                # 기존 사용자와 연관된 프로필을 먼저 삭제
                Profile.objects.filter(user=existing_user).delete()
                existing_user.delete()

            user = serializer.save()
            print(f"✅ 회원가입 성공: {user.userId} ({user.email})")  # 서버 콘솔 로그

            # 🔹 기존 프로필이 존재하면 삭제
            Profile.objects.filter(user=user).delete()

            # 🔹 새로운 프로필 생성
            profile = Profile.objects.create(
                user=user,
                phonenumber=request.data.get("phonenumber"),
                birthday=request.data.get("birthday"),
                username=request.data.get("username"),
            )

            return Response(
                {
                    "message": "User registered successfully.",
                    "user": {
                        "userId": user.userId,
                        "username": user.username,
                        "email": user.email,
                        "phonenumber": profile.phonenumber,
                        "birthday": profile.birthday,
                    },
                },
                status=status.HTTP_201_CREATED,
            )

        except IntegrityError as e:
            error_message = str(e)
            print(f"❌ IntegrityError 발생: {error_message}")  # 서버 콘솔에서 오류 확인

            if "users_profile.phonenumber" in error_message:
                return Response(
                    {"error": "The phone number is already registered."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            elif "users_profile.user_id" in error_message:
                return Response(
                    {"error": "This user ID is already registered."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return Response(
                {"error": "An error occurred while creating the user profile.", "details": error_message},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except Exception as e:
            error_message = str(e)
            print(f"❌ 예기치 못한 오류 발생: {error_message}")  # 서버 콘솔에서 오류 확인
            return Response(
                {"error": "An unexpected error occurred.", "details": error_message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )



class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(
            {"message": "이 API는 로그인 기능을 제공합니다."},
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data  # ✅ 수정된 토큰 반환 로직 적용

        return Response(token, status=status.HTTP_200_OK)


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Profile.objects.none()
        return Profile.objects.filter(user=self.request.user)
