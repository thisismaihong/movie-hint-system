from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()

import pandas as pd

from apps.mh_movie.models import Movie, Genre, MovieGenre

DATASET = BASE_DIR / "etl" / "datasets" / "processed" / "netflix_movies_only.csv"

def load_movie_genre():
    df = pd.read_csv(DATASET, encoding="latin1").head(1000)
    count = 0
    for _, row in df.iterrows():
        title = row["title"]
        movie = Movie.objects.filter(title_en=title).first()
        if movie is None:
            continue
        genres = str(row["listed_in"]).split(",")
        for genre_name in genres:
            genre_name = genre_name.strip()
            if genre_name == "":
                continue
            genre = Genre.objects.filter(name=genre_name).first()
            if genre is None:
                continue
            MovieGenre.objects.get_or_create(
                movie=movie,
                genre=genre
            )
            count += 1
    print(f"Đã thêm {count} quan hệ Movie - Genre")


if __name__ == "__main__":
    load_movie_genre()