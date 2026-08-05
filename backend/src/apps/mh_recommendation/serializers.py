import datetime
from rest_framework import serializers

from apps.mh_movie.models import Genre, Country
from . import selectors
from .models import Preferences, FavoriteMovie
from ..mh_movie.serializers import MovieDetailOutputSerializer
from ..mh_movie import serializers as movie_serializers


class PreferencesInputSerializer(serializers.ModelSerializer):
    preferred_release_year_from =serializers.IntegerField(
        min_value=1900,
        max_value=datetime.datetime.now().year
    )
    preferred_release_year_to = serializers.IntegerField(
        min_value=1900,
        max_value=datetime.datetime.now().year
    )

    genres = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False
    )
    countries = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False
    )

    def validate(self, attrs):
        if attrs["preferred_release_year_from"] > attrs["preferred_release_year_to"]:
            raise serializers.ValidationError("Năm bắt đầu phải nhỏ hơn hoặc bằng năm kết thúc.")
        return attrs

    class Meta:
        model = Preferences
        fields = [
            "preferred_release_year_from",
            "preferred_release_year_to",
            "genres",
            "countries",
        ]

class PreferencesOutputSerializer(serializers.ModelSerializer):
    genres = serializers.SerializerMethodField()
    countries = serializers.SerializerMethodField()
    class Meta:
        model = Preferences
        fields = [
            "preferred_release_year_from",
            "preferred_release_year_to",
            "genres",
            "countries",
        ]

    def get_genres(self, obj):
        return GenreOutputSerializer(
            [item.genre for item in obj.preference_genres.all()],
            many=True
        ).data

    def get_countries(self, obj):
        return CountryOutputSerializer(
            [item.country for item in obj.preference_countries.all()],
            many=True
        ).data


class GenreOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ["id", "name"]

class CountryOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["id", "name"]

class FavoriteMovieInputSerializer(serializers.Serializer):
    movie_id = serializers.IntegerField()

class FavoriteMovieOutputSerializer(movie_serializers.MovieOutputSerializer):
    favorite_id = serializers.IntegerField(source="id")
    class Meta(movie_serializers.MovieOutputSerializer.Meta):
        fields = [
            "favorite_id",
            *movie_serializers.MovieOutputSerializer.Meta.fields,
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance.movie)
        data["favorite_id"] = instance.id
        return data
