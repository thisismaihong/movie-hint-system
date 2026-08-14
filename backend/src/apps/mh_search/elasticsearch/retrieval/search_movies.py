from elasticsearch import Elasticsearch
from sentence_transformers import SentenceTransformer

MODEL_NAME="BAAI/bge-m3"
INDEX_NAME="movies"
TOP_K=20

def load_embedding_model():
    return SentenceTransformer(MODEL_NAME)

def embed_query(model, query):
    return model.encode(query, normalize_embeddings=True)

def search_movies(elasticsearch, query_embedding, top_k=TOP_K):
    response=elasticsearch.search(
        index=INDEX_NAME,
        knn={
            "field":"embedding",
            "query_vector":query_embedding.tolist(),
            "k":top_k,
            "num_candidates":100
        },
        source=[
            "movie_id",
            "title_en",
            "title_vn",
            "release_year",
            "movie_text"
        ]
    )
    return response["hits"]["hits"]

def main():
    elasticsearch = Elasticsearch(["http://localhost:9200"])
    query="Tôi muốn tìm một bộ phim về một người con đối mặt với cái chết của cha mình."
    print("Bắt đầu SEMANTIC SEARCH ...")
    print("Mô tả phim: ", query)

    if not elasticsearch.ping():
        print("FAIL: Elasticsearch connection failed.")
        return
    print("PASS: Elasticsearch connected.")

    model = load_embedding_model()
    query_embedding = embed_query(model, query)
    print("Số chiều embedding: ", len(query_embedding))

    result=search_movies(elasticsearch, query_embedding)
    print("===== TOP RESULT =====")
    for rank, hit in enumerate(result,1):
        movie=hit["_source"]
        print("Movie ID:", movie["movie_id"])
        print("Title EN:", movie["title_en"])
        print("Title VN:", movie["title_vn"])
        print("Release year:", movie["release_year"])
        print("Score:", hit["_score"])
        print("Movie text:", movie["movie_text"])

if __name__ == "__main__":
    main()