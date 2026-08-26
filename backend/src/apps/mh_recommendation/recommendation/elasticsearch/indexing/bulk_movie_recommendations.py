#File đẩy tất cả embedding của phim lên elasticsearch
from pathlib import Path
import json
import numpy as np
from elasticsearch import Elasticsearch, helpers


CURRENT_FILE = Path(__file__).resolve()

ELASTICSEARCH_DIR = CURRENT_FILE.parents[1]

EMBEDDINGS_FILE = (ELASTICSEARCH_DIR/ "prepare_data"/ "movie_embeddings.npy")
METADATA_FILE = (ELASTICSEARCH_DIR/ "prepare_data"/ "movie_embedding_metadata.json")

INDEX_NAME = "movie_recommendations"
ES_URL = "http://localhost:9200"


def load_embeddings():
    embeddings = np.load(EMBEDDINGS_FILE)
    with open(METADATA_FILE, "r", encoding="utf-8") as file:
        metadata = json.load(file)
    print(f"Embeddings shape: {embeddings.shape}")
    print(f"Metadata count: {len(metadata)}")
    return embeddings, metadata

def create_actions(embeddings, metadata):
    for embedding, movie in zip(embeddings, metadata):
        yield {
            "_index": INDEX_NAME,
            "_id": movie["movie_id"],
            "_source": {
                "movie_id": movie["movie_id"],
                "title_en": movie["title_en"],
                "title_vn": movie["title_vn"],
                "genres": movie["genres"],
                "countries": movie["countries"],
                "release_year": movie["release_year"],
                "age_rating": movie["age_rating"],
                "duration": movie["duration"],
                "description_en": movie["description_en"],
                "description_vn": movie["description_vn"],
                "embedding": embedding.tolist(),
            },
        }


def bulk_movie_recommendations():
    embeddings, metadata = load_embeddings()

    if len(embeddings) != len(metadata):
        print("FAIL: Embeddings và metadata không cùng số lượng.")
        return

    es = Elasticsearch(ES_URL)
    if not es.ping():
        print("FAIL: Elasticsearch connection failed.")
        return
    print("PASS: Elasticsearch connection successful.")

    if not es.indices.exists(index=INDEX_NAME):
        print(f"FAIL: Index '{INDEX_NAME}' không tồn tại.")
        return
    print(f"PASS: Index '{INDEX_NAME}' exists.")

    actions = create_actions(embeddings, metadata)
    success, failed = helpers.bulk(
        es,
        actions,
        chunk_size=100,
        raise_on_error=False,
    )

    print("===== BULK RESULT =====")
    print(f"Documents indexed: {success}")
    print(f"Documents failed: {len(failed)}")
    if failed:
        print("===== FAILED DOCUMENTS =====")
        for item in failed[:5]:
            print(item)
    if success == len(metadata) and not failed:
        print("PASS: Tất cả movie đã được bulk thành công.")
    else:
        print("WARNING: Có movie chưa được bulk thành công.")

if __name__ == "__main__":
    bulk_movie_recommendations()