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

