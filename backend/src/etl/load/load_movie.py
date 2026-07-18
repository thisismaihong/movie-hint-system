from pathlib import Path
import sys
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()
from apps.mh_movie.models import Movie

DATASET=BASE_DIR / "etl" / "datasets" / "processed" / "netflix_movies_only.csv"

df=(pd.read_csv(DATASET, encoding="latin1")).head(1000)
df=df[
    [
        "title",
        "release_year",
        "rating",
        "duration",
        "description",
    ]
]

def load_movie():
    count=0
    for i, (_, row) in enumerate(df.iterrows()):
        if i == 1000:
            break
        Movie.objects.get_or_create(
            title_en=row["title"].strip(),
            defaults={
                "release_year": int(row["release_year"]),
                "age_rating": row["rating"],
                "duration": row["duration"],
                "description_en": row["description"],
            }
        )
        count+=1
        if count%500==0:
            print(f"Đã import {count} bộ phim")
    print(f"Hoàn thành {count} phim.")

if __name__ == "__main__":
    load_movie()