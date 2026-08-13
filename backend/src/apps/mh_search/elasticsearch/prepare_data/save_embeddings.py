from pathlib import Path
import json
import numpy as np
import sys

CURRENT_FILE=Path(__file__).resolve()
SRC_DIR=CURRENT_FILE.parents[4]

if str(SRC_DIR) not in sys.path:
    sys.path.insert(0,str(SRC_DIR))

from apps.mh_search.elasticsearch.prepare_data.generate_embeddings import load_embedding_model, generate_embeddings
from apps.mh_search.elasticsearch.prepare_data.prepare_movie_data import get_movie_data

EMBEDDINGS_FILE=CURRENT_FILE.parent/"movie_embeddings.npy"
METADATA_FILE=CURRENT_FILE.parent/"movie_embedding_metadata.json"

def save_embeddings():
    movie_data=get_movie_data()
    model=load_embedding_model()
    embeddings=generate_embeddings(movie_data,model)

    np.save(EMBEDDINGS_FILE,embeddings)

    metadata=[
        {
            "movie_id":movie["movie_id"],
            "title_en":movie["title_en"],
            "title_vn":movie["title_vn"],
            "release_year":movie["release_year"],
            "movie_text": movie["movie_text"],
        }
        for movie in movie_data
    ]

    with open(METADATA_FILE,"w",encoding="utf-8") as file:
        json.dump(metadata,file,ensure_ascii=False,indent=2)

    return embeddings,metadata

def verify_saved_embeddings():
    embeddings=np.load(EMBEDDINGS_FILE)

    with open(METADATA_FILE,"r",encoding="utf-8") as file:
        metadata=json.load(file)

    return embeddings,metadata

def main():
    print("===== Lưu Movie Embeddings =====")

    embeddings,metadata=save_embeddings()

    print("===== Kiểm tra dữ liệu đã lưu =====")
    print(f"Số lượng embeddings: {len(embeddings)}")
    print(f"Số chiều vector: {embeddings.shape[1]}")
    print(f"Số lượng metadata: {len(metadata)}")

    saved_embeddings,saved_metadata=verify_saved_embeddings()

    print("===== Kiểm tra sau khi đọc lại =====")
    print(f"Shape embeddings: {saved_embeddings.shape}")
    print(f"Số lượng metadata: {len(saved_metadata)}")

    if saved_embeddings.shape==(3201,1024):
        print("PASS: Shape embeddings đúng.")
    else:
        print(f"FAIL: Shape không đúng: {saved_embeddings.shape}")

    if len(saved_metadata)==3201:
        print("PASS: Metadata đúng số lượng.")
    else:
        print("FAIL: Metadata sai số lượng.")

    if np.array_equal(embeddings,saved_embeddings):
        print("PASS: Embeddings trước và sau khi lưu giống nhau.")
    else:
        print("FAIL: Embeddings bị thay đổi.")

    if metadata==saved_metadata:
        print("PASS: Metadata trước và sau khi lưu giống nhau.")
    else:
        print("FAIL: Metadata bị thay đổi.")

    print("===== Movie mẫu =====")
    print("Movie ID:",saved_metadata[0]["movie_id"])
    print("Title:",saved_metadata[0]["title_en"])
    print("First 10 values:",saved_embeddings[0][:10])

if __name__=="__main__":
    main()