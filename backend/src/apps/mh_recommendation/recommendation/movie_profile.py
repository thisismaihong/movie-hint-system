from apps.mh_movie.models import Movie


def get_movie_profile():
    movies=(Movie.objects.prefetch_related("movie_genres","movie_countries").all())
    profiles=[]
    for movie in movies:
        profiles.append({
            "movie_id":movie.id,
            "genres":[item.genre_id for item in movie.movie_genres.all()],
            "countries":[item.country_id for item in movie.movie_countries.all()],
            "release_year":movie.release_year
        })
    return profiles