from ..recommend.movie_profile import get_movie_profile
from ..recommend.scoring import calculate_recommendation_score


def get_candidate_movies(user_profile, top_k=20):
    movies=get_movie_profile()
    candidates=[]
    favorite_movies_id={
        favorite["movie_id"] for favorite in user_profile["favorites"]
    }
    for movie in movies:
        if movie["movie_id"] in favorite_movies_id:
            continue #phim nào có trong danh sách yêu thích rồi thì không nên trả ra nữa

        recommendation_score=calculate_recommendation_score(user_profile, movie)
        candidates.append({
            "movie_id": movie["movie_id"],
            "title_en": movie["title_en"],
            "title_vn": movie["title_vn"],
            "release_year":movie["release_year"],
            "age_rating": movie["age_rating"],
            "duration": movie["duration"],
            "description_en": movie["description_en"],
            "description_vn": movie["description_vn"],
            "recommendation_score": recommendation_score,
        })

    candidates.sort(
        key=lambda movie: movie["recommendation_score"],
        reverse=True
    )
    return candidates[:top_k]
