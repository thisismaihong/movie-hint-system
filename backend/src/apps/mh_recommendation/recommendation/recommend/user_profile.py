from apps.mh_recommendation.models import Preferences, FavoriteMovie


def build_user_profile(user):
    preferences=(Preferences.objects.prefetch_related(
        "preference_genres__genre",
        "preference_countries__country",
    ).get(user=user))
    favorites=(FavoriteMovie.objects.select_related("movie").prefetch_related(
        "movie__movie_genres__genre",
        "movie__movie_countries__country",
    ).filter(user=user))

    profile={
        "genres": [item.genre.name for item in preferences.preference_genres.all()],
        "countries": [item.country.name for item in preferences.preference_countries.all()],
        "release_year_from": preferences.preferred_release_year_from,
        "release_year_to": preferences.preferred_release_year_to,
        "favorites":[]
    }

    for favorite in favorites:
        movie=favorite.movie
        profile["favorites"].append({
            "movie_id": movie.id,
            "genres": [item.genre.name for item in movie.movie_genres.all()],
            "countries": [item.country.name for item in movie.movie_countries.all()],
        })
    return profile