from . import selectors


def get_all_genres_service():
    return selectors.get_all_genres()

def get_all_countries_service():
    return selectors.get_all_countries()

def get_movies_service(filters=None):
    return selectors.get_movies(filters)
# search, filter, recommendation đều thêm ở đây

def get_movie_detail_service(movie_id):
    return selectors.get_movie_by_id(movie_id)