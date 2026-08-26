from apps.mh_movie.models import Movie


def get_movie_profile():
    movies=(Movie.objects.prefetch_related("movie_genres","movie_countries").all())
    profiles=[]
    for movie in movies:
        profiles.append({
            "movie_id":movie.id,
            "title_en": movie.title_en,
            "title_vn": movie.title_vn,
            "genres": [item.genre.name for item in movie.movie_genres.all()],
            "countries": [item.country.name for item in movie.movie_countries.all()],
            "release_year":movie.release_year,

            #fields phục vụ cho việc giải thích, không tính score
            "age_rating": movie.age_rating,
            "duration": movie.duration,
            "description_en": movie.description_en,
            "description_vn": movie.description_vn,
        })
    return profiles

def build_movie_embedding_text(profile):
    return f"""
            Genres: {", ".join(profile["genres"])}
            Countries: {", ".join(profile["countries"])}
            Release year: {profile["release_year"]}
            Description: {profile["description_en"] or ""}
            """.strip()