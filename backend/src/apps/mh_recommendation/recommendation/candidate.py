from .movie_profile import get_movie_profile
from .scoring import calculate_recommendation_score


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
            "recommendation_score": recommendation_score,
            "release_year":movie["release_year"],
        })

    candidates.sort(
        key=lambda movie: movie["recommendation_score"],
        reverse=True
    )
    return candidates[:top_k]
