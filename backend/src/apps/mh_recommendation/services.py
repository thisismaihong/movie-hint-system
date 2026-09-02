from django.db import transaction

from . import selectors, managers
from .models import FavoriteMovie
from .recommendation.recommend.user_profile import build_user_profile
from .recommendation.retrieval.recommendation_context import build_recommendation_context
from .recommendation.retrieval.recommendation_reason import generate_recommendation_reason
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

def delete_favorite_movie_by_movieid_service(user, movie_id):
    favorite_movie=selectors.get_favorite_movie_by_movie_id(user, movie_id)
    if not favorite_movie:
        return False
    favorite_movie.delete()
    return True


def get_recommendations_service(user, top_k=40):
    user_profile=build_user_profile(user)
    candidates=get_elasticsearch_recommendations(user, top_k)
    context=build_recommendation_context(user_profile, candidates)
    recommendations=generate_recommendation_reason(context)
    return recommendations