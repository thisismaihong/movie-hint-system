from pathlib import Path
import sys
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()
from apps.mh_movie.models import Director

DATASET = BASE_DIR / "etl" / "datasets" / "processed" / "netflix_movies_only.csv"

def load_directors():
    df = pd.read_csv(DATASET, encoding="latin1").head(1000)
    count=0
    for directors in df["director"]:
        if pd.isna(directors):
            continue
        director_list=directors.split(",")

        for director in director_list:
            director = director.strip()
            if director == "":
                continue
            Director.objects.get_or_create(name=director)
            count+=1
    print(f"Đã xử lý {count} director.")

if __name__ == "__main__":
    load_directors()