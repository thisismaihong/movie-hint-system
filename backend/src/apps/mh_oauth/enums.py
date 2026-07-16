from django.db import models


class RoleEnum(models.TextChoices):
    USER = 'user'
    ADMIN = 'admin'

class GenderEnum(models.TextChoices):
    MALE = 'male'
    FEMALE = 'female'

class AccountStatusEnum(models.TextChoices):
    ACTIVE = 'active'
    INACTIVE = 'inactive'
    BANNED = 'banned'
    DELETED = 'deleted'

class RegistrationEnum(models.TextChoices):
    NORMAL='normal','Normal'
    EMAIL='email', 'Email'
    GOOGLE='google', 'Google'
