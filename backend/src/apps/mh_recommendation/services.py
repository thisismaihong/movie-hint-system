from django.db import transaction

from . import selectors, managers
from .models import FavoriteMovie
from ..mh_movie.models import Movie
from .recommendation.recommend.elasticsearch_recommendation import (
    get_elasticsearch_recommendations,
)


def get_preferences_service(user):
    return selectors.get_preferences(user)


@transaction.atomic
def update_preferences_service(user, data):
    preferences=selectors.get_preferences(user)
    managers.PreferencesManager.update_preferences(preferences, data)
    managers.PreferencesManager.update_preferences_genres(preferences, data["genres"])
    managers.PreferencesManager.update_preferences_countries(preferences, data["countries"])
    return selectors.get_preferences(user)

def add_favorite_movie(user, movie_id):
    movie=Movie.objects.get(pk=movie_id)
    return FavoriteMovie.objects.get_or_create(user=user, movie=movie)

def delete_favorite_movie(user, favorite_id):
    favorite = FavoriteMovie.objects.get(
        id=favorite_id,
        user=user,
    )
    favorite.delete()

def get_recommendations_service(user, top_k=40):
    return get_elasticsearch_recommendations(user, top_k)
