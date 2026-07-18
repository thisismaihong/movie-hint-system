from pathlib import Path
import sys
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()

from apps.mh_movie.models import Movie
from apps.mh_movie.models import Director
from apps.mh_movie.models import MovieDirector

DATASET = BASE_DIR / "etl" / "datasets" / "processed" / "netflix_movies_only.csv"

def load_movie_director():
    df= pd.read_csv(DATASET, encoding="latin1").head(1000)
    count=0
    for _, row in df.iterrows():
        movie=Movie.objects.get(title_en=row["title"].strip())
        directors=row["director"]
        if pd.isna(directors):
            continue
        for director_name in directors.split(","):
            director=Director.objects.get(name=director_name.strip())
            MovieDirector.objects.get_or_create(
                movie=movie,
                director=director
            )
            count+=1
    print(f"Đã tạo {count} MovieDirector.")

if __name__ == "__main__":
    load_movie_director()