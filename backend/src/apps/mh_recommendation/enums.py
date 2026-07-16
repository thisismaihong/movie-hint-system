from django.db import models


class SentimentEnum(models.TextChoices):
    POSITIVE = 'positive'
    NEGATIVE = 'negative'
    NEUTRAL = "neutral"