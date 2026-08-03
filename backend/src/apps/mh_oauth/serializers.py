from datetime import datetime

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .enums import GenderEnum
from .models import User
from ..mh_recommendation.serializers import PreferencesInputSerializer, PreferencesOutputSerializer


class RegisterInputSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=150)
    password = serializers.CharField(required=True, min_length=8, write_only=True)
    email = serializers.EmailField(required=True)
    gender=  serializers.ChoiceField(choices=GenderEnum.choices)
    date_of_birth=serializers.DateField()
    preferences=PreferencesInputSerializer()

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Tên đăng nhập đã tồn tại.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email đã được sử dụng.")
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def validate(self, attrs):
        birth=attrs["date_of_birth"]
        if birth.year < 1900 or (birth.year > datetime.now().year):
            raise serializers.ValidationError("Ngày sinh không hợp lệ.")
        return attrs


class UserOutputSerializer(serializers.ModelSerializer):
    preferences=serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "gender", "date_of_birth", "avatar", "preferences"]

    def get_preferences(self, obj):
        if hasattr(obj, "preferences"):
            return PreferencesOutputSerializer(obj.preferences).data
        return None

    def to_representation(self, instance):
        data=super().to_representation(instance)
        if instance.avatar:
            data["avatar"]=instance.avatar.url
        return data


class ProfileOutputSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    class Meta:
        model=User
        fields=[
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "gender",
            "date_of_birth",
            "role",
            "date_joined",
            "avatar",
            "status"
        ]

    def get_avatar(self, obj):
        if not obj.avatar:
            return None

        return obj.avatar.url

class LoginInputSerializer(serializers.Serializer):
    username=serializers.CharField(required=True)
    password=serializers.CharField(required=True, write_only=True)

class LoginOutputSerializer(serializers.Serializer):
    access_token=serializers.CharField()
    refresh_token=serializers.CharField()
    token_type=serializers.CharField()
    expires=serializers.IntegerField()

class UpdateProfileInputSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    avatar = serializers.ImageField(
        required=False,
        allow_null=True,
    )

class ChangePasswordInputSerializer(serializers.Serializer):
    old_password=serializers.CharField(write_only=True)
    new_password=serializers.CharField(write_only=True)
    confirm_password=serializers.CharField(write_only=True)

    def validate(self, attrs):
        user=self.context["request"].user
        old_password = attrs.get("old_password")
        new_password = attrs.get("new_password")
        confirm_password = attrs.get("confirm_password")
        if not user.check_password(old_password):
            raise serializers.ValidationError("Mật khẩu cũ chưa đúng")
        if new_password != confirm_password:
            raise serializers.ValidationError("Mật khẩu mới không khớp")
        if old_password == new_password:
            raise serializers.ValidationError("Mật khẩu mới phải khác mật khẩu cũ")
        validate_password(new_password, user)
        return attrs

class CheckAvailabilityInputSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
