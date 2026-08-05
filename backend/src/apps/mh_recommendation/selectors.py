from django.db.models import Prefetch

from .models import Preferences, PreferenceGenre, PreferenceCountry, FavoriteMovie
from ..mh_movie.models import Movie
from ..mh_movie.selectors import apply_movie_filters
from django.db.models import Q


def get_preferences(user):
    return(
        Preferences.objects.filter(user=user).prefetch_related(
            Prefetch(
                "preference_genres",
                queryset=PreferenceGenre.objects.select_related("genre"),
            ),
            Prefetch(
                "preference_countries",
                queryset=PreferenceCountry.objects.select_related("country"),
            ),
        ).first()
    )



def get_favorite_movies(user, filters: dict):
    query = (
        FavoriteMovie.objects
        .select_related("movie")
        .prefetch_related(
            "movie__movie_genres__genre",
            "movie__movie_countries__country",
            "movie__movie_actors__actor",
        )
        .filter(user=user)
    )

    q = filters.get("q")
    release_year = filters.get("release_year")
    country = filters.get("country")
    genre = filters.get("genre")

    if q:
        query = query.filter(
            Q(movie__title_en__icontains=q) |
            Q(movie__title_vn__icontains=q) |
            Q(movie__movie_actors__actor__name__icontains=q)
        )

    if release_year:
        query = query.filter(
            movie__release_year=release_year
        )
    if country:
        query = query.filter(
            movie__movie_countries__country_id=country
        )
    if genre:
        query = query.filter(
            movie__movie_genres__genre_id=genre
        )
    return query.distinct()


def is_favorite_movie(user, movie_id):
    return FavoriteMovie.objects.filter(user=user, movie_id=movie_id).exists()

