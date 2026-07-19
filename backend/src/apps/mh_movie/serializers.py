from rest_framework import serializers

from .models import Genre, Country


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model=Genre
        fields=[
            "id",
            "name",
        ]
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model=Country
        fields=[
            "id",
            "name",
        ]
