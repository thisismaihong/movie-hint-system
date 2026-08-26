from pathlib import Path
import json
import numpy as np
import os
import django


os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "config.settings"
)

django.setup()


from ...recommend.movie_profile import get_movie_profile
from ...embedding.movie_embedding import embed_movie_profile


CURRENT_FILE = Path(__file__).resolve()

EMBEDDINGS_FILE = CURRENT_FILE.parent / "movie_embeddings.npy"
METADATA_FILE = CURRENT_FILE.parent / "movie_embedding_metadata.json"


def save_embeddings():
    movie_profiles = get_movie_profile()

    embeddings = []
    metadata = []

    print(f"Tổng số phim: {len(movie_profiles)}")
    print("===== Bắt đầu tạo Movie Recommendations Embeddings =====")

    for index, movie in enumerate(movie_profiles, 1):
        embedding = embed_movie_profile(movie)

        embeddings.append(embedding)

        metadata.append({
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
        })

        if index % 100 == 0 or index == len(movie_profiles):
            print(f"Đã embedding: {index}/{len(movie_profiles)}")

    embeddings = np.array(embeddings)
    np.save(EMBEDDINGS_FILE, embeddings)
    with open(METADATA_FILE, "w", encoding="utf-8") as file:
        json.dump(
            metadata,
            file,
            ensure_ascii=False,
            indent=2
        )

    print("===== Lưu thành công =====")
    print(f"Embeddings: {EMBEDDINGS_FILE}")
    print(f"Metadata: {METADATA_FILE}")

    return embeddings, metadata


def verify_saved_embeddings():
    embeddings = np.load(EMBEDDINGS_FILE)
    with open(METADATA_FILE, "r", encoding="utf-8") as file:
        metadata = json.load(file)
    return embeddings, metadata


def main():
    embeddings, metadata = save_embeddings()

    print(f"Số lượng embeddings: {len(embeddings)}")
    print(f"Số lượng metadata: {len(metadata)}")

    saved_embeddings, saved_metadata = verify_saved_embeddings()

    print()
    print("===== KIỂM TRA SAU KHI ĐỌC LẠI =====")

    print(f"Shape embeddings: {saved_embeddings.shape}")
    print(f"Số lượng metadata: {len(saved_metadata)}")

    if len(saved_embeddings) == len(saved_metadata):
        print("PASS: Embeddings và metadata cùng số lượng.")
    else:
        print("FAIL: Embeddings và metadata không cùng số lượng.")

    if np.array_equal(embeddings, saved_embeddings):
        print("PASS: Embeddings trước và sau khi lưu giống nhau.")
    else:
        print("FAIL: Embeddings bị thay đổi.")

    if metadata == saved_metadata:
        print("PASS: Metadata trước và sau khi lưu giống nhau.")
    else:
        print("FAIL: Metadata bị thay đổi.")

    print()
    print("===== MOVIE MẪU =====")

    print("Movie ID:", saved_metadata[0]["movie_id"])
    print("Title:", saved_metadata[0]["title_en"])
    print("Genres:", saved_metadata[0]["genres"])
    print("Countries:", saved_metadata[0]["countries"])
    print("First 10 values:", saved_embeddings[0][:10])


if __name__ == "__main__":
    main()