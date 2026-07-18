from django.core.exceptions import ValidationError
from django.db import transaction

from . import managers
from apps.mh_recommendation.managers import PreferencesManager
from apps.mh_movie import selectors as movie_selectors

@transaction.atomic
def register_service(data: dict):
    preferences_data=data.pop("preferences")
    genre_ids = preferences_data["genres"]
    country_ids = preferences_data["countries"]

    genres=movie_selectors.get_genres_by_id(genre_ids)
    countries=movie_selectors.get_countries_by_id(country_ids)

    if len(genres) != len(set(genre_ids)):
        raise ValidationError("Có một hoặc nhiều thể loại phim không tồn tại.")

    if len(countries) != len(set(country_ids)):
        raise ValidationError("Có một hoặc nhiều quốc gia không tồn tại.")

    user=managers.MyUserManager.create_user(data)

    preferences=PreferencesManager.create_preferences(
        user=user,
        data=preferences_data
    )
    PreferencesManager.create_preferences_genres(
        preferences=preferences,
        genre_ids=genre_ids
    )
    PreferencesManager.create_preferences_countries(
        preferences=preferences,
        country_ids=country_ids
    )

    return user
