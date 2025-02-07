from django.contrib.auth import get_user_model  # ✅ 수정: User 모델 가져오기
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
from .models import Profile

User = get_user_model()  # ✅ 수정: CustomUser 사용

class RegisterSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]  # ✅ User에서 userId 중복 체크
    )
    username = serializers.CharField(required=True)
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]  # ✅ 이메일 중복 체크
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    passwordRe = serializers.CharField(write_only=True, required=True)
    phonenumber = serializers.CharField(required=False)  # 중복 체크 제거
    birthday = serializers.DateField(required=True)

    class Meta:
        model = User
        fields = ('userId', 'username', 'password', 'passwordRe', 'email', 'phonenumber', 'birthday')

    def validate(self, data):
        if data['password'] != data['passwordRe']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return data

    def create(self, validated_data):
        # CustomUser 생성
        user = User.objects.create_user(  # ✅ 수정: get_user_model()을 사용
            userId=validated_data['userId'],  # ✅ 수정: CustomUser의 userId 필드 사용
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        # Profile 생성
        Profile.objects.create(  # ✅ 수정: Profile 생성 시 userId 제거
            user=user,
            username=validated_data['username'],
            phonenumber=validated_data.get('phonenumber', ''),  # 중복 허용
            birthday=validated_data['birthday']
        )

        # 인증 토큰 생성
        Token.objects.create(user=user)
        return user

class LoginSerializer(serializers.Serializer):
    userId = serializers.CharField(required=True)  # userId로 로그인
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        try:
            user = User.objects.get(userId=data["userId"])  # ✅ userId로 사용자 찾기
        except User.DoesNotExist:
            raise serializers.ValidationError({"error": "Invalid credentials. User not found."})

        if not user.check_password(data["password"]):  # ✅ 비밀번호 검증
            raise serializers.ValidationError({"error": "Invalid credentials. Incorrect password."})

        # ✅ 토큰 생성
        token, _ = Token.objects.get_or_create(user=user)
        
        return {"token": token.key, "message": "Login successful."}



class ProfileSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(read_only=True)
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Profile
        fields = ("userId", "username", "email", "image", "phonenumber", "birthday")
