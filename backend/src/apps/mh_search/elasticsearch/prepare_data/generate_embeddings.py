import sys
from pathlib import Path

import numpy as np
from sentence_transformers import SentenceTransformer

CURRENT_FILE=Path(__file__).resolve()
SRC_DIR=CURRENT_FILE.parents[4]

if str(SRC_DIR) not in sys.path:
    sys.path.insert(0,str(SRC_DIR))

from apps.mh_search.elasticsearch.prepare_data.prepare_movie_data import get_movie_data

MODEL_NAME="BAAI/bge-m3"

def load_embedding_model():
    return SentenceTransformer(MODEL_NAME)

def generate_embeddings(movie_data, model):
    movie_texts=[movie["movie_text"] for movie in movie_data]
    return model.encode(movie_texts, normalize_embeddings=True, show_progress_bar=True)

def main():
    print("Generating embeddings...")
    movie_data=get_movie_data()
    print(f"Số lượng phim: {len(movie_data)}")

    model=load_embedding_model()
    print(f"Model Embedding là: {MODEL_NAME}")

    #Generate toàn bộ phim trong csdl sang vector
    embeddings=generate_embeddings(movie_data,model)

    print("===== Kết quả =====")
    print(f"Số lượng Embeddings: {len(embeddings)}")
    print(f"Số chiều vector: {embeddings.shape[1]}")

    if len(embeddings) == len(movie_data):
        print("PASS: Đúng số lượng embeddings.")
    else:
        print(f"FAIL: Sai số lượng embeddings ({len(embeddings)})")

    if embeddings.shape[1] == 1024:
        print("PASS: Số chiều vector là 1024.")
    else:
        print(f"FAIL: Số chiều vector mong muốn là 1024, nhưng -> {embeddings.shape[1]}.")

    if np.isnan(embeddings).any():
        print("FAIL: Embeddings contain NaN.")
    else:
        print("PASS: No NaN values.")

    if np.isinf(embeddings).any():
        print("FAIL: Embeddings contain infinite values.")
    else:
        print("PASS: No infinite values.")

    print("===== Embedding mẫu =====")
    print("Movie ID:", movie_data[0]["movie_id"])
    print("Title:", movie_data[0]["title_en"])
    print("First 10 values:", embeddings[0][:10])

if __name__=="__main__":
    main()
