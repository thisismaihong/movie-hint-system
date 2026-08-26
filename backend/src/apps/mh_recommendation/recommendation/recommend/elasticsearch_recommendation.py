from elasticsearch import Elasticsearch
from ..recommend.user_profile import build_user_profile
from ..embedding.user_embedding import embed_user_profile


ES_URL = "http://localhost:9200"
INDEX_NAME = "movie_recommendations"
TOP_K = 40


def get_elasticsearch_recommendations(user, top_k=TOP_K):
    user_profile = build_user_profile(user)
    user_embedding = embed_user_profile(user_profile)

    es = Elasticsearch(ES_URL)
    if not es.ping():
        raise ConnectionError(
            "Không thể kết nối tới Elasticsearch."
        )

    response = es.search(
        index=INDEX_NAME,
        size=top_k,
        knn={
            "field": "embedding",
            "query_vector": user_embedding.tolist(),
            "k": top_k,
            "num_candidates": 100,
        },
        source=[
            "movie_id",
            "title_en",
            "title_vn",
            "genres",
            "countries",
            "release_year",
            "age_rating",
            "duration",
            "description_en",
            "description_vn",
        ],
    )

    print("INDEX COUNT:", es.count(index=INDEX_NAME))
    print("TOP_K:", top_k)
    print("TOTAL HITS:", len(response["hits"]["hits"]))

    recommendations = []
    for hit in response["hits"]["hits"]:
        movie = hit["_source"]
        recommendations.append({
            "movie": movie,
            "score": float(hit["_score"]),
        })
    return recommendations