from datetime import date
from rest_framework import serializers
from .models import Genre, Country, Movie, MovieGenre, MovieCountry, MovieActor, MovieDirector, MoviePlatform


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model=Genre
        fields=[
            "id",
            "name",
        ]

class GenreOutputSerializer(serializers.Serializer):
    id=serializers.IntegerField()
    name=serializers.CharField()


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model=Country
        fields=[
            "id",
            "name",
        ]

class CountryOutputSerializer(serializers.Serializer):
    id=serializers.IntegerField()
    name=serializers.CharField()

class MovieGenreSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="genre.id")
    name = serializers.CharField(source="genre.name")
    class Meta:
        model = MovieGenre
        fields = ("id","name")

class MovieCountrySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="country.id")
    name = serializers.CharField(source="country.name")
    class Meta:
        model = MovieCountry
        fields = ("id","name")

class MovieDirectorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="director.id")
    name = serializers.CharField(source="director.name")
    class Meta:
        model = MovieDirector
        fields = ("id","name")

class MovieActorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="actor.id")
    name = serializers.CharField(source="actor.name")
    class Meta:
        model = MovieActor
        fields = ("id","name")

class MoviePlatformSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="platform.id")
    name = serializers.CharField(source="platform.name")

    class Meta:
        model = MoviePlatform
        fields = ("id","name")

class MovieOutputSerializer(serializers.ModelSerializer):
    genres = MovieGenreSerializer(source="movie_genres", many=True)
    countries = MovieCountrySerializer(source="movie_countries", many=True)
    poster = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = (
            "id",
            "title_en",
            "title_vn",
            "release_year",
            "genres",
            "countries",
            "poster",
            # "is_favorite_movie",
        )

    def get_poster(self, obj):
        if not obj.poster:
            return None

        return obj.poster.url

class MovieDetailOutputSerializer(serializers.ModelSerializer):
    genres = MovieGenreSerializer(
        source="movie_genres",
        many=True,
    )
    countries = MovieCountrySerializer(
        source="movie_countries",
        many=True,
    )
    directors = MovieDirectorSerializer(
        source="movie_directors",
        many=True,
    )
    actors = MovieActorSerializer(
        source="movie_actors",
        many=True,
    )
    platforms = MoviePlatformSerializer(
        source="movie_platforms",
        many=True,
    )
    poster = serializers.SerializerMethodField()
    is_favorite_movie = serializers.BooleanField(read_only=True)

    class Meta:
        model = Movie
        fields = (
            "id",
            "title_vn",
            "title_en",
            "release_year",
            "age_rating",
            "duration",
            "genres",
            "countries",
            "directors",
            "actors",
            "platforms",
            "poster",
            "description_vn",
            "description_en",
            "is_favorite_movie",
        )

    def get_poster(self, obj):
        if obj.poster:
            return obj.poster.url
        return None

class MovieSuggestionInputSerializer(serializers.Serializer):
    title_vn=serializers.CharField(required=True, allow_blank=False, allow_null=False)
    title_en=serializers.CharField(required=False, allow_blank=True, allow_null=True)
    country=serializers.ListField(required=True, allow_empty=False, child=serializers.CharField(allow_blank=False, allow_null=False))
    description_vn=serializers.CharField(required=True, allow_blank=False, allow_null=False)
    release_year=serializers.IntegerField(required=True, allow_null=False)

    def validate_release_year(self, value):
        if value < 0 or value > date.today().year:
            raise serializers.ValidationError(
                "Năm phát hành không hợp lệ."
            )
        return value

class MovieSuggestionOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = [
            "id",
            "title_vn",
            "title_en",
            "description_vn",
            "release_year",
            "status",
        ]

class SuggestedMovieOutputSerializer(serializers.ModelSerializer):
    suggested_by = serializers.CharField(
        source="suggested_by.username"
    )
    country = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = [
            "id",
            "title_vn",
            "title_en",
            "country",
            "description_vn",
            "release_year",
            "status",
            "suggested_by",
            "date_added",
        ]

    def get_country(self, obj):
        return [
            movie_country.country.name
            for movie_country in obj.movie_countries.all()
        ]

class ApproveMovieSuggestionInputSerializer(serializers.Serializer):
    description_en=serializers.CharField(required=True, allow_blank=False, allow_null=False)
    title_en=serializers.CharField(required=False, allow_blank=True, allow_null=True)
    poster=serializers.ImageField(required=False, allow_null=True)
    age_rating=serializers.CharField(required=False, allow_blank=True, allow_null=True)
    duration=serializers.CharField(required=False, allow_blank=True, allow_null=True)
    admin_note=serializers.CharField(required=False, allow_blank=True, allow_null=True)
    genres = serializers.ListField(
        required=True,
        allow_empty=False,
        child=serializers.CharField(
            allow_blank=False,
            allow_null=False,
        ),
    )
    actors = serializers.ListField(
        required=True,
        allow_empty=False,
        child=serializers.CharField(
            allow_blank=False,
            allow_null=False,
        ),
    )
    directors = serializers.ListField(
        required=True,
        allow_empty=False,
        child=serializers.CharField(
            allow_blank=False,
            allow_null=False,
        ),
    )
    platforms = serializers.ListField(
        required=False,
        allow_empty=True,
        child=serializers.CharField(
            allow_blank=False,
            allow_null=False,
        ),
    )

class RejectMovieSuggestionInputSerializer(serializers.Serializer):
    admin_note=serializers.CharField(required=True, allow_blank=False, allow_null=False)

class MySuggestedMovieOutputSerializer(serializers.ModelSerializer):
    country=serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = [
            "id",
            "title_vn",
            "country",
            "date_added",
            "status",
        ]

    def get_country(self, obj):
        return [
            movie_country.country.name
            for movie_country in obj.movie_countries.all()
        ]