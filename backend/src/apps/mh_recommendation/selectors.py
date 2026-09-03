from django.db.models import Prefetch

from .models import Preferences, PreferenceGenre, PreferenceCountry, FavoriteMovie, Feedback
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

def get_favorite_movie_by_movie_id(user, movie_id):
    return FavoriteMovie.objects.filter(user=user, movie_id=movie_id).first()

def is_favorite_movie(user, movie_id):
    return FavoriteMovie.objects.filter(user=user, movie_id=movie_id).exists()


def filter_recommendations(recommendations, filters):
    q = filters.get("q")
    release_year = filters.get("release_year")
    country = filters.get("country")
    genre = filters.get("genre")

    result = recommendations

    if q:
        q = q.lower()
        result = [
            item for item in result
            if q in (item["movie"]["title_en"] or "").lower()
            or q in (item["movie"]["title_vn"] or "").lower()
        ]
    if release_year:
        result = [
            item for item in result
            if str(item["movie"]["release_year"]) == str(release_year)
        ]
    if country:
        result = [
            item for item in result
            if any(
                str(country) == str(country_name)
                for country_name in item["movie"]["countries"]
            )
        ]
    if genre:
        result = [
            item for item in result
            if any(
                str(genre) == str(genre_name)
                for genre_name in item["movie"]["genres"]
            )
        ]
    return result

# def get_feedback_by_user_and_movie(user, movie_id):
#     return Feedback.objects.filter(user=user, movie_id=movie_id).first()

def get_feedbacks_by_movie(movie_id):
    return Feedback.objects.filter(movie_id=movie_id).select_related("user", "movie").order_by("-created_date")
