from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()

import pandas as pd

from apps.mh_movie.models import Movie, Actor, MovieActor

DATASET = BASE_DIR / "etl" / "datasets" / "processed" / "netflix_movies_only.csv"

def load_movie_actor():
    df = pd.read_csv(DATASET, encoding="latin1").head(1000)
    count=0
    for _, row in df.iterrows():
        title = row["title"]
        movie = Movie.objects.filter(title_en=title).first()
        if movie is None:
            continue
        actors=str(row["cast"]).split(",")
        for actor_name in actors:
            if actor_name=="":
                continue
            actor=Actor.objects.filter(name=actor_name).first()
            if actor is None:
                continue
            MovieActor.objects.get_or_create(
                movie=movie,
                actor=actor,
            )
            count+=1
    print(f"Đã thêm {count} quan hệ Movie - Actor")

if __name__ == "__main__":
    load_movie_actor()