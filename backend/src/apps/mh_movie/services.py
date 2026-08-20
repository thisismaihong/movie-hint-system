from . import selectors
from ..mh_recommendation import selectors as recommendation_selectors
from .translation.translation_service import translate_movie_description

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
