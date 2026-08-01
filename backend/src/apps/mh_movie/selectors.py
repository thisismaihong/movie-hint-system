from django.core.exceptions import ValidationError
from django.db.models import Prefetch, Q
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


def get_movies(filters=None):
    filters = filters or {}
    query=base_movie_query()
    query=apply_movie_filters(query, filters)
    return query.order_by("-release_year", "title_en")

def base_movie_query():
    return Movie.objects.prefetch_related(
        Prefetch("movie_genres", queryset=MovieGenre.objects.select_related("genre")),
        Prefetch("movie_countries", queryset=MovieCountry.objects.select_related("country")),
        Prefetch("movie_actors", queryset=MovieActor.objects.select_related("actor")),
        Prefetch("movie_directors", queryset=MovieDirector.objects.select_related("director")),
        Prefetch("movie_platforms", queryset=MoviePlatform.objects.select_related("platform")),
    )

def get_movie_by_id(movie_id: int):
    try:
        return base_movie_query().get(pk=movie_id)
    except Movie.DoesNotExist:
        raise NotFound("Không tìm thấy phim.")

def apply_movie_filters(query, filter: dict):
    q=filter.get("q") #title/actor
    release_year=filter.get("release_year")
    country=filter.get("country")
    genre=filter.get("genre")

    if q:
        query=query.filter(
            Q(title_en__icontains=q)|
            Q(title_vn__icontains=q)|
            Q(movie_actors__actor__name__icontains=q)
        )
    if release_year:
        try:
            query=query.filter(release_year=int(release_year))
        except (ValueError, TypeError):
            pass
    if country:
        query=query.filter(movie_countries__country_id=country)
    if genre:
        query=query.filter(movie_genres__genre_id=genre)

    return query.distinct()






