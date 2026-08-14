def build_recommendation_context(user_profile, candidates):
    return{
        "user":{
            "genres": user_profile["genres"],
            "countries": user_profile["countries"],
            "release_year_from": user_profile["release_year_from"],
            "release_year_to": user_profile["release_year_to"],
            "favorites": user_profile["favorites"]
        },
        "candidates":candidates,
    }