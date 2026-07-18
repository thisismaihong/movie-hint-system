from django.db import transaction

from .models import Preferences, PreferenceGenre, PreferenceCountry


class PreferencesManager:
    @staticmethod
    @transaction.atomic
    def create_preferences(user, data: dict):
        return Preferences.objects.create(
            user=user,
            preferred_release_year_from=data["preferred_release_year_from"],
            preferred_release_year_to=data["preferred_release_year_to"]
        )

    @staticmethod
    @transaction.atomic
    def create_preferences_genres(preferences, genre_ids: list):
        objects=[
            PreferenceGenre(
                preference=preferences,
                genre_id=genre_id
            )
            for genre_id in genre_ids
        ]
        PreferenceGenre.objects.bulk_create(objects)
        return objects

    @staticmethod
    @transaction.atomic
    def create_preferences_countries(preferences, country_ids: list):
        objects=[
            PreferenceCountry(
                preference=preferences,
                country_id=country_id
            )
            for country_id in country_ids
        ]
        PreferenceCountry.objects.bulk_create(objects)
        return objects