from elasticsearch import Elasticsearch

INDEX_NAME="movies"

def create_movie_index():
    es=Elasticsearch("http://localhost:9200")
    if not es.ping():
        print("FAIL: Elasticsearch connection failed")
        return

    print("PASS: Elasticsearch connection successful")

    if es.indices.exists(index=INDEX_NAME):
        print(f"Index '{INDEX_NAME}' already exists.")
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
            "release_year": {
                "type": "integer"
            },
            "movie_text": {
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

    es.indices.create(index=INDEX_NAME, mappings=mapping)
    print(f"PASS: Index '{INDEX_NAME}' created.")

def test_movie_index():
    es=Elasticsearch("http://localhost:9200")
    if not es.indices.exists(index=INDEX_NAME):
        print("FAIL: Index does not exist.")
        return

    mapping = es.indices.get_mapping(index=INDEX_NAME)
    print("===== INDEX MAPPING =====")
    print(mapping)

if __name__=="__main__":
    create_movie_index()
    test_movie_index()
