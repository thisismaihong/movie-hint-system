from sentence_transformers import SentenceTransformer

MODEL_NAME="BAAI/bge-m3"

def load_embedding_model():
    return SentenceTransformer(MODEL_NAME)

def embed_query(model, query):
    return  model.encode(query, normalize_embeddings=True)

def main():
    query="Tôi muốn tìm một bộ phim về du hành thời gian."
    model = load_embedding_model()
    embedding=embed_query(model, query)
    print("Đang trong quá trình Embedding ...")
    print("Mô tả: ", query)
    print("Số chiều embedding: ", len(embedding))
    print("10 giá trị đầu tiên: ", embedding[:10])

if __name__ == "__main__":
    main()