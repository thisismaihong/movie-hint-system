import json
from pathlib import Path

import numpy as np
from django.contrib.messages import success
from elasticsearch import Elasticsearch, helpers

CURRENT_FILE = Path(__file__).resolve()
ELASTICSEARCH_DIR = CURRENT_FILE.parent
EMBEDDINGS_FILE = ELASTICSEARCH_DIR / "prepare_data" / "movie_embeddings.npy"
METADATA_FILE = ELASTICSEARCH_DIR / "prepare_data" / "movie_embedding_metadata.json"
INDEX_NAME = "movies"
ES_URL = "http://localhost:9200"

def load_data():
    embeddings= np.load(EMBEDDINGS_FILE)
    with open(METADATA_FILE, "r", encoding="utf-8") as file:
        metadata = json.load(file)
    return embeddings, metadata

def create_action(embeddings, metadata):
    for embedding, movie in zip(embeddings, metadata):
        yield {
            "_index": INDEX_NAME,
            "_id": movie["movie_id"],
            "_source": {
                "movie_id": movie["movie_id"],
                "title_en": movie["title_en"],
                "title_vn": movie["title_vn"],
                "release_year": movie["release_year"],
                "movie_text": movie["movie_text"],
                "embedding": embedding.tolist(),
            },
        }

def bulk_movies():
    print("===== BULK MOVIES TO ELASTICSEARCH =====")
    print("Đang load embeddings và metadata...")
    embeddings, metadata = load_data()
    print(f"Embeddings: {embeddings.shape}")
    print(f"Metadata: {len(metadata)}")

    if len(embeddings) != len(metadata):
        print("FAIL: Embeddings và metadata không cùng số lượng.")
        return

    if embeddings.shape[1] != 1024:
        print(f"FAIL: Embedding dimension không đúng: {embeddings.shape[1]}")
        return

    es=Elasticsearch(ES_URL)
    if not es.ping():
        print("FAIL: Elasticsearch connection failed.")
        return
    print("PASS: Elasticsearch connection successful.")

    if not es.indices.exists(index=INDEX_NAME):
        print(f"FAIL: Index '{INDEX_NAME}' không tồn tại.")
        return
    print(f"PASS: Index '{INDEX_NAME}' exists.")

    actions=create_action(embeddings, metadata)
    success, failed=helpers.bulk(es, actions, chunk_size=100, raise_on_error=False)

    print("===== Kết quả BULK =====")
    print(f"Documents indexed: {success}")
    print(f"Documents failed: {len(failed)}")

    if failed:
        print("===== FAILED DOCUMENTS =====")
        for item in failed[:5]:
            print(item)

    if success == len(metadata) and not failed:
        print("PASS: Tất cả movie đã được bulk vào Elasticsearch.")
    else:
        print("WARNING: Có document chưa được bulk thành công.")

if __name__ == "__main__":
    bulk_movies()


