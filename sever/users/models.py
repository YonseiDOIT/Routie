from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings
from datetime import date

class CustomUserManager(BaseUserManager):
    def create_user(self, userId, username, email, password=None, **extra_fields):
        if not userId:
            raise ValueError('The User must have a userId')
        email = self.normalize_email(email)
        user = self.model(userId=userId, username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, userId, username, email, password=None, **extra_fields):
        """
        Create and return a superuser with a userId, username, email, and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(userId, username, email, password, **extra_fields)

# ✅ CustomUser 모델 (User 모델 확장)
class CustomUser(AbstractUser):
    userId = models.CharField(max_length=20, unique=True)  # 로그인 ID
    birthday = models.DateField(null=True, blank=False)  # 생일 필수 입력

    USERNAME_FIELD = "userId"  # userId로 로그인하도록 설정
    REQUIRED_FIELDS = ["email", "birthday", "username"]
    
    objects = CustomUserManager()

    def __str__(self):
        return self.userId


# ✅ Profile 모델
class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)  # CustomUser 참조
    email = models.EmailField(max_length=50, blank=True, null=True)  # 이메일
    username = models.CharField(max_length=20, blank=False)  # 닉네임
    phonenumber = models.CharField(max_length=15, blank=False)  # 전화번호 (필수)
    birthday = models.DateField(blank=False, null=True, default=date(2000, 1, 1))  # 기본값 2000-01-01
    password = models.CharField(max_length=300, blank=True, null=True)  # 비밀번호 (해싱됨)
    image = models.ImageField(upload_to="profile/", default="profile/default.png")  # 프로필 사진

    def __str__(self):
        return self.username
