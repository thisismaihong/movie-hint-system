from django.db import models


class SearchTypeEnum(models.TextChoices):
    KEYWORD = 'keyword'
    AI_DESCRIPTION = 'ai_description'
