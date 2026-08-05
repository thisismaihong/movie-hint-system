from . import selectors
from ..mh_recommendation import selectors as recommendation_selectors

def get_all_genres_service():
    return selectors.get_all_genres()

def get_all_countries_service():
    return selectors.get_all_countries()

def get_movies_service(filters=None):
    return selectors.get_movies(filters)
# search, filter, recommendation đều thêm ở đây

def get_movie_detail_service(user, movie_id):
    movie=selectors.get_movie_by_id(movie_id)
    if user.is_authenticated:
        movie.is_favorite_movie=(
            recommendation_selectors.is_favorite_movie(user, movie_id)
        )
    else:
        movie.is_favorite_movie=False
    return movie