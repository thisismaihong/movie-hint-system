from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()

import pandas as pd

from apps.mh_movie.models import Genre

DATASET = BASE_DIR / "etl" / "datasets" / "processed" / "netflix_movies_only.csv"

def load_genre():
    df = pd.read_csv(DATASET, encoding="latin1").head(1000)
    count=0
    for genres in df["listed_in"].fillna(""):
        genre_list=genres.split(",")
        for genre in genre_list:
            genre=genre.strip()
            if genre == "":
                continue
            Genre.objects.get_or_create(name=genre)
            count+=1
    print(f"Đã xử lý {count} genre.")

if __name__ == "__main__":
    load_genre()
