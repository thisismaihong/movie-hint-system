from django.db import models
from apps.mh_oauth.models import User
from apps.mh_movie.models import Genre, Country, Movie
from apps.mh_recommendation.enums import SentimentEnum


class Preferences(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferences')
    preferred_release_year_from = models.PositiveSmallIntegerField(null=True, blank=True)
    preferred_release_year_to = models.PositiveSmallIntegerField(null=True, blank=True)
    created_date=models.DateTimeField(auto_now_add=True)
    updated_date=models.DateTimeField(auto_now=True)
    class Meta:
        db_table = 'preferences'
    def __str__(self):
        return f"Preferences for {self.user.username}"

class PreferenceGenre(models.Model):
    preference=models.ForeignKey(Preferences, on_delete=models.CASCADE, related_name='preference_genres')
    genre=models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='genre_preferences')
    class Meta:
        db_table = 'preference_genre'
        unique_together = ('preference', 'genre')
    def __str__(self):
        return f"{self.preference.user.username} - {self.genre.name}"

class PreferenceCountry(models.Model):
    preference=models.ForeignKey(Preferences, on_delete=models.CASCADE, related_name='preference_countries')
    country=models.ForeignKey(Country, on_delete=models.CASCADE, related_name='country_preferences')
    class Meta:
        db_table = 'preference_country'
        unique_together = ('preference', 'country')
    def __str__(self):
        return f"{self.preference.user.username} - {self.country.name}"


class FavoriteMovie(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorite_movies')
    movie=models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='favorite_users')
    class Meta:
        db_table = 'favorite_movie'
        unique_together = ('user', 'movie')
    def __str__(self):
        return f"{self.user.username} loves {self.movie}"


class Feedback(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedbacks')
    movie=models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='feedbacks')
    content=models.TextField()
    created_date=models.DateTimeField(auto_now_add=True)
    sentiment=models.CharField(choices=SentimentEnum.choices, max_length=10, null=True, blank=True)
    class Meta:
        db_table = 'feedback'
        # unique_together = ('user', 'movie')
    def __str__(self):
        return f"{self.user.username} commented on {self.movie} : {self.content}"

