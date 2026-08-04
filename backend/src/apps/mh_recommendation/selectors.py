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
        Movie.objects
        .prefetch_related(
            "movie_genres__genre",
            "movie_countries__country",
            "movie_actors__actor",
        )
        .filter(
            favorite_users__user_id=user.id
        )
    )

    query = apply_movie_filters(query, filters)

    return query.distinct()


def is_favorite_movie(user, movie_id):
    return FavoriteMovie.objects.filter(user=user, movie_id=movie_id).exists()

