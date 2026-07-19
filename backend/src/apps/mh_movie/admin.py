from django.contrib import admin

from .models import Genre, Country, Movie

admin.site.register(Genre)
admin.site.register(Country)
admin.site.register(Movie)