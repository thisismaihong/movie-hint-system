from django.core.cache import cache
from rest_framework.exceptions import ValidationError

from . import selectors
from .summary.summary_service import summary_movie_description
from ..mh_recommendation import selectors as recommendation_selectors
from .translation.translation_service import translate_movie_description
from django.db import transaction
from .models import Movie, Country, MovieCountry, Genre, Actor, Director, Platform, MovieGenre, MovieActor, MovieDirector, MoviePlatform
from .enums import MovieStatusEnum
from rest_framework.exceptions import NotFound
from datetime import datetime

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
    countries = Country.objects.filter(
        name__in=data["country"]
    )

    if countries.count() != len(data["country"]):
        raise ValidationError(
            {"country": "Một hoặc nhiều quốc gia không tồn tại."}
        )

    movie = Movie.objects.create(
        title_vn=data.get("title_vn"),
        title_en=data.get("title_en"),
        description_vn=data.get("description_vn"),
        release_year=data.get("release_year"),
        suggested_by=user,
        status=MovieStatusEnum.PENDING,
    )

    MovieCountry.objects.bulk_create(
        [
            MovieCountry(
                movie=movie,
                country=country,
            )
            for country in countries
        ]
    )

    return movie

def get_suggested_movies_service():
    return selectors.get_suggested_movies()

def get_suggested_movie_detail_service(movie_id):
    movie=selectors.get_suggested_movie_by_id(movie_id)
    if movie is None:
        raise NotFound("Không tìm thấy phim được đề xuất!")
    return movie

@transaction.atomic
def approve_movie_suggestion_service(movie_id, data):
    movie = selectors.get_suggested_movie_by_id(movie_id)

    if movie is None:
        raise NotFound("Không tìm thấy phim đề xuất.")

    if movie.status != MovieStatusEnum.PENDING:
        raise ValidationError(
            {"status": "Phim đề xuất này không ở trạng thái chờ duyệt."}
        )

    genres = [
        Genre.objects.get_or_create(name=name)[0]
        for name in data["genres"]
    ]

    actors = [
        Actor.objects.get_or_create(name=name)[0]
        for name in data["actors"]
    ]

    directors = [
        Director.objects.get_or_create(name=name)[0]
        for name in data["directors"]
    ]

    platforms = []

    if "platforms" in data:
        platforms = [
            Platform.objects.get_or_create(name=name)[0]
            for name in data["platforms"]
        ]

    movie.description_en = data.get("description_en")

    if "title_en" in data:
        movie.title_en = data.get("title_en")

    if "poster" in data:
        movie.poster = data.get("poster")

    if "age_rating" in data:
        movie.age_rating = data.get("age_rating")

    if "duration" in data:
        movie.duration = data.get("duration")

    if "admin_note" in data:
        movie.admin_note = data.get("admin_note")

    movie.status = MovieStatusEnum.APPROVED
    movie.reviewed_date = datetime.today()
    movie.updated_date = datetime.today()

    movie.save()

    MovieGenre.objects.bulk_create(
        [
            MovieGenre(movie=movie, genre=genre)
            for genre in genres
        ]
    )

    MovieActor.objects.bulk_create(
        [
            MovieActor(movie=movie, actor=actor)
            for actor in actors
        ]
    )

    MovieDirector.objects.bulk_create(
        [
            MovieDirector(movie=movie, director=director)
            for director in directors
        ]
    )

    if platforms:
        MoviePlatform.objects.bulk_create(
            [
                MoviePlatform(movie=movie, platform=platform)
                for platform in platforms
            ]
        )

    return movie

@transaction.atomic
def reject_movie_suggestion_service(movie_id, data):
    movie=selectors.get_suggested_movie_by_id(movie_id)
    if movie is None:
        raise NotFound("Không tìm thấy phim đề xuất.")

    if movie.status != MovieStatusEnum.PENDING:
        raise ValidationError({"status":"Phim đề xuất bổ sung này không ở trạng thái chờ duyệt."})

    movie.admin_note=data.get("admin_note")
    movie.status=MovieStatusEnum.REJECTED
    movie.reviewed_date = datetime.today()
    movie.updated_date = datetime.today()
    movie.save()
    return movie

@transaction.atomic
def delete_rejected_movie_suggestion_service(movie_id):
    movie=selectors.get_suggested_movie_by_id(movie_id)
    if movie is None:
        raise NotFound("Không tìm thấy phim đề xuất.")

    if movie.status != MovieStatusEnum.REJECTED:
        raise ValidationError({"status":"Phim đề xuất bổ sung này không ở trạng thái bị từ chối."})

    movie.delete()

def get_my_suggested_movie_detail_service(user, movie_id):
    movie=selectors.get_my_suggested_movie_by_id(user, movie_id)
    if movie is None:
        raise NotFound("Không tìm thấy phim đề xuất.")

    return movie


