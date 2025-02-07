from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import Profile

# User 모델 가져오기 (settings.AUTH_USER_MODEL 사용)
CustomUser = get_user_model()

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = "profile"
    fields = ('userId', 'username', 'email', 'phonenumber', 'birthday', 'image')  # userId 추가

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)
    list_display = ('userId', 'username', 'email', 'get_phonenumber')  # userId 추가

    def userId(self, obj):
        return obj.userId  # CustomUser의 userId 필드 가져오기
    userId.short_description = 'User ID'

    def get_phonenumber(self, obj):
        return obj.profile.phonenumber if hasattr(obj, 'profile') else None
    get_phonenumber.short_description = 'Phone Number'

# CustomUser 모델을 등록
admin.site.register(CustomUser, UserAdmin)
admin.site.register(Profile)
