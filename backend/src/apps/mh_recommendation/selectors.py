from django.db.models import Prefetch

from .models import Preferences, PreferenceGenre, PreferenceCountry


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