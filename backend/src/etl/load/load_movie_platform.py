from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()

import pandas as pd

from apps.mh_movie.models import Movie, Platform, MoviePlatform

DATASET = BASE_DIR / "etl" / "datasets" / "processed" / "netflix_movies_only.csv"


def load_movie_platform():
    df = pd.read_csv(DATASET, encoding="latin1").head(1000)
    platform = Platform.objects.filter(name="Netflix").first()
    if platform is None:
        print("Chưa có Platform Netflix.")
        return
    count = 0

    for _, row in df.iterrows():
        title = row["title"]
        movie = Movie.objects.filter(title_en=title).first()
        if movie is None:
            continue
        MoviePlatform.objects.get_or_create(
            movie=movie,
            platform=platform
        )
        count += 1
    print(f"Đã thêm {count} quan hệ Movie - Platform")


if __name__ == "__main__":
    load_movie_platform()