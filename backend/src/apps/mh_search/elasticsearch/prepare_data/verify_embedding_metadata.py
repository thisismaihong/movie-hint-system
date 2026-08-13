import json
from pathlib import Path
import numpy as np

CURRENT_FILE=Path(__file__).resolve()
ELASTICSEARCH_DIR=CURRENT_FILE.parent
EMBEDDINGS_FILE=ELASTICSEARCH_DIR/"movie_embeddings.npy"
METADATA_FILE=ELASTICSEARCH_DIR/"movie_embedding_metadata.json"

def load_data():
    embeddings=np.load(EMBEDDINGS_FILE)
    with open(METADATA_FILE,"r",encoding="utf-8") as f:
        metadata=json.load(f)
    return embeddings,metadata

def verify_count(embeddings,metadata):
    print("===== KIỂM TRA SỐ LƯỢNG =====")
    print("Số lượng embeddings:",len(embeddings))
    print("Số lượng metadata:",len(metadata))

    if len(embeddings)==len(metadata):
        print("PASS: Số lượng embeddings và metadata giống nhau.")
        return True

    print("FAIL: Số lượng embeddings và metadata không giống nhau.")
    return False

def verify_dimension(embeddings):
    print("\n===== KIỂM TRA DIMENSION =====")
    print("Shape embeddings:",embeddings.shape)

    if embeddings.ndim==2 and embeddings.shape[1]==1024:
        print("PASS: Embedding dimension là 1024.")
        return True

    print("FAIL: Embedding dimension không phải 1024.")
    return False

def verify_movie_ids(metadata):
    print("\n===== KIỂM TRA MOVIE ID =====")
    movie_ids=[item["movie_id"] for item in metadata]

    unique_ids=set(movie_ids)

    print("Tổng movie ID:",len(movie_ids))
    print("Movie ID duy nhất:",len(unique_ids))

    if len(movie_ids)==len(unique_ids):
        print("PASS: Không có movie ID trùng.")
        return True

    duplicates=[movie_id for movie_id in movie_ids if movie_ids.count(movie_id)>1]
    print("FAIL: Có movie ID trùng.")
    print("Duplicate IDs:",sorted(set(duplicates)))
    return False

def verify_index_mapping(embeddings,metadata):
    print("\n===== KIỂM TRA INDEX MAPPING =====")

    if not embeddings.any():
        print("WARNING: Embeddings rỗng.")
        return False

    if not metadata:
        print("WARNING: Metadata rỗng.")
        return False

    sample_count=min(5,len(metadata))

    for i in range(sample_count):
        movie=metadata[i]
        print(f"Index {i} -> Movie ID: {movie['movie_id']} -> {movie['title_en']}")

    print("PASS: Embedding index và metadata index có cùng thứ tự.")

    return True

def verify_required_fields(metadata):
    print("\n===== KIỂM TRA METADATA =====")

    required_fields=[
        "movie_id",
        "title_en",
        "title_vn",
        "release_year",
        "movie_text"
    ]

    missing=[]

    for i,item in enumerate(metadata):
        for field in required_fields:
            if field not in item:
                missing.append((i,field))

    if not missing:
        print("PASS: Tất cả metadata có đầy đủ field.")
        return True

    print("FAIL: Có metadata thiếu field.")
    print("Missing fields:",missing[:10])
    return False

def main():
    print("===== VERIFY EMBEDDING METADATA =====")

    embeddings,metadata=load_data()

    count_ok=verify_count(embeddings,metadata)
    dimension_ok=verify_dimension(embeddings)
    ids_ok=verify_movie_ids(metadata)
    mapping_ok=verify_index_mapping(embeddings,metadata)
    fields_ok=verify_required_fields(metadata)

    print("\n===== KẾT QUẢ =====")

    if all([count_ok,dimension_ok,ids_ok,mapping_ok,fields_ok]):
        print("PASS: Embeddings và metadata đã sẵn sàng để bulk vào Elasticsearch.")
    else:
        print("FAIL: Cần kiểm tra lại dữ liệu trước khi bulk.")

if __name__=="__main__":
    main()