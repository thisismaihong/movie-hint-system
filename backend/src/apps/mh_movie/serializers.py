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
        )

    def get_poster(self, obj):
        if obj.poster:
            return obj.poster.url
        return None