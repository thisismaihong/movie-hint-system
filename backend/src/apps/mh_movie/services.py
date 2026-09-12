from django.core.cache import cache
from rest_framework.exceptions import ValidationError

from . import selectors
from .summary.summary_service import summary_movie_description
from ..mh_recommendation import selectors as recommendation_selectors
from .translation.translation_service import translate_movie_description
from django.db import transaction
from .models import Movie, Country, MovieCountry
from .enums import MovieStatusEnum

def get_all_genres_service():
    return selectors.get_all_genres()

def get_all_countries_service():
    return selectors.get_all_countries()

def get_movies_service(filters=None):
    return selectors.get_movies(filters)

def get_movie_detail_service(user, movie_id):
    movie=selectors.get_movie_by_id(movie_id)
    if user.is_authenticated:
        movie.is_favorite_movie=(
            recommendation_selectors.is_favorite_movie(user, movie_id)
        )
    else:
        movie.is_favorite_movie=False
    return movie

def translate_description_service(movie_id):
    movie=selectors.get_movie_by_id(movie_id)
    if not movie:
        return None

    if movie.description_vn:
        return movie

    description_en=movie.description_en
    if not description_en:
        return movie

    description_vn=translate_movie_description(description_en)
    movie.description_vn=description_vn
    movie.save(update_fields=["description_vn"])
    return movie

def summarize_description_service(movie_id):
    movie=selectors.get_movie_by_id(movie_id)
    if not movie:
        return None

    description_en=movie.description_en
    if not description_en:
        return ""

    cache_key=f"movie_summary_{movie_id}"
    cached_summary=cache.get(cache_key)
    if cached_summary:
        return cached_summary

    description_summary=summary_movie_description(description_en)
    cache.set(cache_key, description_summary)

    # from django.core.cache import cache
    # cache.delete("movie_summary_1")
    return description_summary

@transaction.atomic
def suggest_movie_service(user, data):
    country = Country.objects.filter(
        name=data["country"]
    ).first()

    if country is None:
        raise ValidationError(
            {"country": "Quốc gia không tồn tại."}
        )

    movie = Movie.objects.create(
        title_vn=data["title_vn"],
        title_en=data["title_en"],
        description_vn=data["description_vn"],
        release_year=data["release_year"],
        suggested_by=user,
        status=MovieStatusEnum.PENDING,
    )

    MovieCountry.objects.create(
        movie=movie,
        country=country,
    )

    return movie

def get_pending_movies_service():
    return selectors.get_pending_movies()

