from cloudinary.models import CloudinaryField
from django.db import models

from .enums import MovieStatusEnum
from django.conf import settings

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        db_table = 'genre'
        ordering = ['name']
    def __str__(self):
        return self.name

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        db_table = 'country'
        ordering = ['name']

    def __str__(self):
        return self.name

class Platform(models.Model):
    name = models.CharField(max_length=100, unique=True)
    url = models.URLField()
    class Meta:
        db_table = 'platform'
        ordering = ['name']
    def __str__(self):
        return self.name

class Actor(models.Model):
    name = models.CharField(max_length=100)
    class Meta:
        db_table = 'actor'
        ordering = ['name']
    def __str__(self):
        return self.name

class Director(models.Model):
    name = models.CharField(max_length=100)
    class Meta:
        db_table = 'director'
        ordering = ['name']
    def __str__(self):
        return self.name


class Movie(models.Model):
    title_en = models.CharField(max_length=200, null=True, blank=True)
    title_vn = models.CharField(max_length=200, null=True, blank=True)
    poster=CloudinaryField("poster", null=True, blank=True)
    date_added=models.DateTimeField(auto_now_add=True)
    release_year=models.PositiveSmallIntegerField()
    age_rating=models.CharField(max_length=20, null=True, blank=True)
    duration=models.CharField(max_length=50, null=True, blank=True)
    description_en=models.TextField(blank=True)
    description_vn=models.TextField(blank=True)

    status=models.CharField(choices=MovieStatusEnum.choices, max_length=20, default=MovieStatusEnum.APPROVED)
    admin_note=models.TextField(blank=True, null=True)
    reviewed_date=models.DateTimeField(blank=True, null=True)
    updated_date=models.DateTimeField(blank=True, null=True)

    suggested_by=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='suggested_movies')

    class Meta:
        db_table = 'movie'
        ordering = ['-release_year','title_en']
    def __str__(self):
        return self.title_en or self.title_vn


class MovieGenre(models.Model):
    movie=models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='movie_genres')
    genre=models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='genre_movies')
    class Meta:
        db_table = 'movie_genre'
        unique_together = ('movie', 'genre')
    def __str__(self):
        return f"{self.movie} - {self.genre}"

class MovieCountry(models.Model):
    movie=models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='movie_countries')
    country=models.ForeignKey(Country, on_delete=models.CASCADE, related_name='country_movies')
    class Meta:
        db_table = 'movie_country'
        unique_together = ('movie', 'country')
    def __str__(self):
        return f"{self.movie} - {self.country}"

class MovieActor(models.Model):
    movie=models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='movie_actors')
    actor=models.ForeignKey(Actor, on_delete=models.CASCADE, related_name='actor_movies')
    class Meta:
        db_table = 'movie_actor'
        unique_together = ('movie', 'actor')
    def __str__(self):
        return f"{self.movie} - {self.actor}"

class MovieDirector(models.Model):
    movie=models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='movie_directors')
    director=models.ForeignKey(Director, on_delete=models.CASCADE, related_name='director_movies')
    class Meta:
        db_table = 'movie_director'
        unique_together = ('movie', 'director')
    def __str__(self):
        return f"{self.movie} - {self.director}"

class MoviePlatform(models.Model):
    movie=models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='movie_platforms')
    platform=models.ForeignKey(Platform, on_delete=models.CASCADE, related_name='platform_movies')
    class Meta:
        db_table = 'movie_platform'
        unique_together = ('movie', 'platform')
    def __str__(self):
        return f"{self.movie} - {self.platform}"

