from django.contrib.auth.models import UserManager
from django.db import transaction

from .enums import RoleEnum
# from .models import User


class CustomUserManager(UserManager):
    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault("role", RoleEnum.ADMIN)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return super().create_superuser(
            username=username,
            email=email,
            password=password,
            **extra_fields
        )


class MyUserManager:
    @staticmethod
    @transaction.atomic
    def create_user(data: dict):
        from .models import User
        password = data.pop("password")
        user=User(**data)
        user.set_password(password)
        user.save()
        return user
