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
    df = pd.read_csv(DATASET, encoding="latin1")

    count = 0

    for _, row in df.iterrows():

        # Tìm movie
        title = str(row["title"]).strip()

        movie = Movie.objects.filter(title_en=title).first()

        if movie is None:
            print(f"Không tìm thấy movie: {title}")
            continue

        # Bỏ qua nếu cast bị NaN
        if pd.isna(row["cast"]):
            continue

        actor_names = [
            actor.strip()
            for actor in row["cast"].split(",")
            if actor.strip()
        ]

        for actor_name in actor_names:

            actor = Actor.objects.filter(name=actor_name).first()

            if actor is None:
                print(f"Không tìm thấy actor: '{actor_name}'")
                continue

            MovieActor.objects.get_or_create(
                movie=movie,
                actor=actor,
            )

            count += 1

    print(f"Đã thêm {count} quan hệ Movie - Actor")


if __name__ == "__main__":
    load_movie_actor()