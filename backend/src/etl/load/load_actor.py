from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()

import pandas as pd

from apps.mh_movie.models import Actor

DATASET = BASE_DIR / "etl" / "datasets" / "processed" / "netflix_movies_only.csv"


def load_actor():
    df = pd.read_csv(DATASET, encoding="latin1").head(1000)
    count=0
    for actors in df["cast"].fillna(""):
        actor_list=actors.split(",")
        for actor in actor_list:
            actor=actor.strip()
            if actor == "":
                continue
            Actor.objects.get_or_create(name=actor)
            count+=1
    print(f"Đã xử lý {count} actor.")

if __name__ == "__main__":
    load_actor()