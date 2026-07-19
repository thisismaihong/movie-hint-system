from django.db.models import Prefetch

from .models import User
from ..mh_recommendation.models import PreferenceGenre, PreferenceCountry


def get_current_user(user: User):
    return (
        User.objects.filter(id=user.id).select_related("preferences").prefetch_related(
            Prefetch(
                "preferences__preference_genres",
                queryset=PreferenceGenre.objects.select_related("genre"),
            ),
            Prefetch(
                "preferences__preference_countries",
                queryset=PreferenceCountry.objects.select_related("country"),
            ),
        ).first()
    )

def get_user_by_id(user_id: int):
    return User.objects.get(id=user_id)

def get_user_by_username(username):
    return User.objects.filter(username=username).first()