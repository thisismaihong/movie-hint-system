from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models
from cloudinary.models import CloudinaryField

from . import managers
from .enums import AccountStatusEnum, RoleEnum, RegistrationEnum, GenderEnum


class User(AbstractUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    avatar = CloudinaryField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GenderEnum.choices, null=True, blank=True)
    date_of_birth=models.DateTimeField(null=True)
    status=models.CharField(choices=AccountStatusEnum.choices, max_length=20, default=AccountStatusEnum.ACTIVE)
    role=models.CharField(choices=RoleEnum.choices, max_length=20, default=RoleEnum.USER)
    registration_method=models.CharField(max_length=20,choices=RegistrationEnum.choices, default=RegistrationEnum.NORMAL)

    AbstractUser.username.field.error_messages['unique'] = 'Tên đăng nhập đã tồn tại'
    AbstractUser.email.field.error_messages['unique'] = 'Email đã tồn tại'

    objects = managers.CustomUserManager()
    def __str__(self):
        return self.username or self.email or self.get_full_name()

    class Meta:
        db_table = 'user'


