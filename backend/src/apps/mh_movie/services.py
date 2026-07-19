from . import selectors


def get_all_genres_service():
    return selectors.get_all_genres()

def get_all_countries_service():
    return selectors.get_all_countries()
