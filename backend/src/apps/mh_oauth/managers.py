from django.contrib.auth.models import UserManager
from .enums import RoleEnum


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

