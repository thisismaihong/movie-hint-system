from django.db import transaction

from . import selectors, managers


def get_preferences_service(user):
    return selectors.get_preferences(user)


@transaction.atomic
def update_preferences_service(user, data):
    preferences=selectors.get_preferences(user)
    managers.PreferencesManager.update_preferences(preferences, data)
    managers.PreferencesManager.update_preferences_genres(preferences, data["genres"])
    managers.PreferencesManager.update_preferences_countries(preferences, data["countries"])
    return selectors.get_preferences(user)