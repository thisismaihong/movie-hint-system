from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.db import transaction
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from rest_framework_simplejwt.tokens import RefreshToken

from . import managers, selectors
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

def login_service(data):
    username=data["username"]
    password=data["password"]
    user=authenticate(username=username, password=password)
    if user is None:
        raise AuthenticationFailed("Username hoặc password không đúng.") #401
    if user.role != "user":
        raise PermissionDenied("Tài khoản không được phép đăng nhập.") #403

    refresh=RefreshToken.for_user(user)
    return {
        "access_token": str(refresh.access_token),
        "refresh_token": str(refresh),
        "token_type": "Bearer",
        "expires":3600
    }

def profile_service(user):
    return selectors.get_user_by_id(user.id)

def update_profile_service(user,data):
    user=selectors.get_user_by_id(user.id)
    return managers.MyUserManager.update_profile(user, data)

def change_password_service(user, data):
    user.set_password(data["new_password"])
    user.save(update_fields=["password"])
    return user

def check_availability_service(username, email):
    return {
        "username_available": not selectors.check_username_exists(username),
        "email_available": not selectors.check_email_exists(email),
    }
