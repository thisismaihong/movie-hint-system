from django.core.exceptions import ValidationError
from django.db.models import Prefetch
from rest_framework.exceptions import NotFound

from .models import Genre, Country, Movie, MovieGenre, MovieCountry, Actor, MovieActor, MovieDirector, MoviePlatform


def get_genres_by_id(genre_ids: list[int]):
    return list(
        Genre.objects.filter(id__in=genre_ids)
    )

def get_countries_by_id(country_ids: list[int]):
    return list(
        Country.objects.filter(id__in=country_ids)
    )

def get_all_genres():
    return Genre.objects.all().order_by("name")


def get_all_countries():
    return Country.objects.all().order_by("name")

def get_movies():
    return Movie.objects.prefetch_related(
        Prefetch("movie_genres", queryset=MovieGenre.objects.select_related("genre")),
        Prefetch("movie_countries", queryset=MovieCountry.objects.prefetch_related("country")),
    ).order_by("-release_year")


def base_movie_query():
    return Movie.objects.prefetch_related(
        Prefetch("movie_genres", queryset=MovieGenre.objects.select_related("genre")),
        Prefetch("movie_countries", queryset=MovieCountry.objects.prefetch_related("country")),
        Prefetch("movie_actors", queryset=MovieActor.objects.prefetch_related("actor")),
        Prefetch("movie_directors", queryset=MovieDirector.objects.prefetch_related("director")),
        Prefetch("movie_platforms", queryset=MoviePlatform.objects.prefetch_related("platform")),
    )

def get_movie_by_id(movie_id: int):
    try:
        return base_movie_query().get(pk=movie_id)
    except Movie.DoesNotExist:
        raise NotFound("Không tìm thấy phim.")