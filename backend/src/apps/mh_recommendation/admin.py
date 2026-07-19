from django.contrib import admin

from .models import (
    Preferences,
    PreferenceGenre,
    PreferenceCountry,
    FavoriteMovie,
    Feedback,
)

admin.site.register(Preferences)
admin.site.register(PreferenceGenre)
admin.site.register(PreferenceCountry)
admin.site.register(FavoriteMovie)
admin.site.register(Feedback)