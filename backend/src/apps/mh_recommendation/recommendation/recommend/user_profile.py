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
            "title_en": movie.title_en,
            "genres": [item.genre.name for item in movie.movie_genres.all()],
            "countries": [item.country.name for item in movie.movie_countries.all()],
            "description_en": movie.description_en,
        })
    return profile


def build_user_embedding_text(profile):
    preferred_genres = set(profile["genres"])
    preferred_countries = set(profile["countries"])

    favorite_movies = []

    for favorite in profile["favorites"]:
        preferred_genres.update(favorite["genres"])
        preferred_countries.update(favorite["countries"])

        favorite_movies.append(
            f"""
            Description: {favorite["description_en"]}
            """.strip()
        )

    genres_text = ", ".join(sorted(preferred_genres))
    countries_text = ", ".join(sorted(preferred_countries))
    favorites_text = "\n".join(favorite_movies)

    return f"""
            Genres: {genres_text}
            Countries: {countries_text}
            Release years: {profile["release_year_from"]} - {profile["release_year_to"]}
            Description: {favorites_text}
            """.strip()