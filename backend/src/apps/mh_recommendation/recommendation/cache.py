from django.core.cache import cache


def get_recommendation_cache_key(user_id):
    return f"recommendation:user:{user_id}"

def get_cached_recommendations(user_id):
    cache_key = get_recommendation_cache_key(user_id)
    return cache.get(cache_key)

def set_cached_recommendations(user_id, recommendations):
    cache_key = get_recommendation_cache_key(user_id)
    cache.set(cache_key, recommendations, timeout=None)

def invalidate_recommendation_cache(user_id):
    cache_key = get_recommendation_cache_key(user_id)
    cache.delete(cache_key)