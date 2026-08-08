
def calculate_preference_score(user_profile, movie_profile):
    user_genres=set(user_profile["genres"])
    user_countries=set(user_profile["countries"])
    movie_genres=set(movie_profile["genres"])
    movie_countries=set(movie_profile["countries"])

    if movie_genres:
        genre_score=len(user_genres & movie_genres)/len(movie_genres) #user_genres & movie_genres là phép giao -> len để lấy sluong phần tử trùng
    else:
        genre_score=0

    if movie_countries:
        country_score=len(user_countries & movie_countries)/len(movie_countries)
    else:
        country_score=0

    preference_score=0.7*genre_score + 0.3*country_score  #Tạm thời tỷ lệ 7-3
    return preference_score


def calculate_release_year_score(user_profile, movie_profile):
    release_year=movie_profile.get("release_year")
    release_year_from=user_profile.get("release_year_from")
    release_year_to=user_profile.get("release_year_to")

    if release_year is None:
        return 0
    if release_year_from is None and release_year_to is None:
        return 0
    if release_year_from is not None and release_year<release_year_from:
        distance=release_year_from-release_year
        return 1/(1+distance)
    if release_year_to is not None and release_year>release_year_to:
        distance=release_year-release_year_to
        return 1/(1+distance)

    return 1.0


def calculate_favorite_score(user_profile, movie_profile):
    favorites=user_profile.get("favorites",[])
    if not favorites:
        return 0
    movie_genres=set(movie_profile.get("genres",[]))
    movie_countries=set(movie_profile.get("countries",[]))
    favorite_scores=[]
    for favorite in favorites:
        favorite_genres=set(favorite.get("genres",[]))
        favorite_countries=set(favorite.get("countries",[]))
        if movie_genres and favorite_genres:
            genre_score=len(movie_genres & favorite_genres)/len(movie_genres)
        else:
            genre_score=0

        if movie_countries and favorite_countries:
            country_score=len(movie_countries & favorite_countries)/len(movie_countries)
        else:
            country_score=0

        similarity_score= 0.7*genre_score + 0.3*country_score
        favorite_scores.append(similarity_score)

    return max(favorite_scores)


def calculate_recommendation_score(user_profile, movie_profile):
    preference_score=calculate_preference_score(user_profile, movie_profile)
    release_year_score=calculate_release_year_score(user_profile, movie_profile)
    favorite_score=calculate_favorite_score(user_profile, movie_profile)

    recommendation_score=(
            preference_score*0.5 +
            release_year_score*0.2 +
            favorite_score*0.3
    )

    return recommendation_score
