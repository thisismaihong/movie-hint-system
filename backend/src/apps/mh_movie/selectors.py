from django.core.exceptions import ValidationError

from .models import Genre, Country


def get_genres_by_id(genre_ids: list[int]):
    return list(
        Genre.objects.filter(id__in=genre_ids)
    )

def get_countries_by_id(country_ids: list[int]):
    return list(
        Country.objects.filter(id__in=country_ids)
    )

def get_all_genres():
    return Genre.objects.all().order_by("name")


def get_all_countries():
    return Country.objects.all().order_by("name")