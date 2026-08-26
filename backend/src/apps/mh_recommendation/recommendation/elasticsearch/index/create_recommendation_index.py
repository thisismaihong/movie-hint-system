from elasticsearch import Elasticsearch

INDEX_NAME = "movie_recommendations"
ES_URL = "http://localhost:9200"

def create_recommendation_index():
    es = Elasticsearch(ES_URL)

    if not es.ping():
        print("FAIL: Elasticsearch connection failed.")
        return
    print("PASS: Elasticsearch connection successful.")

    if es.indices.exists(index=INDEX_NAME):
        print("FAIL: Index already exists.")
        return

    mapping = {
        "properties": {
            "movie_id": {
                "type": "integer"
            },
            "title_en": {
                "type": "text"
            },
            "title_vn": {
                "type": "text"
            },
            "genres": {
                "type": "text"
            },
            "countries": {
                "type": "text"
            },
            "release_year": {
                "type": "integer"
            },
            "age_rating": {
                "type": "keyword"
            },
            "duration": {
                "type": "keyword"
            },
            "description_en": {
                "type": "text"
            },
            "description_vn": {
                "type": "text"
            },
            "embedding": {
                "type": "dense_vector",
                "dims": 1024,
                "index": True,
                "similarity": "cosine"
            }
        }
    }
    es.indices.create(
        index=INDEX_NAME,
        mappings=mapping
    )
    print(f"PASS: Index '{INDEX_NAME}' created.")

def test_recommendation_index():
    es = Elasticsearch(ES_URL)

    if not es.indices.exists(index=INDEX_NAME):
        print("FAIL: Index does not exist.")
        return

    mapping = es.indices.get_mapping(index=INDEX_NAME)

    print("===== RECOMMENDATION INDEX MAPPING =====")
    print(mapping)

if __name__ == "__main__":
    create_recommendation_index()
    test_recommendation_index()