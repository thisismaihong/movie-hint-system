from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()

import pandas as pd

from apps.mh_movie.models import Movie, Country, MovieCountry

DATASET = BASE_DIR / "etl" / "datasets" / "processed" / "netflix_movies_only.csv"

def load_movie_country():
    df = pd.read_csv(DATASET, encoding="latin1").head(1000)
    count=0
    for _, row in df.iterrows():
        title = row["title"]
        movie = Movie.objects.filter(title_en=title).first()
        if movie is None:
            continue
        countries = str(row["country"]).split(",")
        for country_name in countries:
            country_name = country_name.strip()
            if country_name=="":
                continue
            country = Country.objects.filter(name=country_name).first()
            if country is None:
                continue
            MovieCountry.objects.get_or_create(
                movie=movie,
                country=country
            )
            count+=1
    print(f"Đã thêm {count} quan hệ Movie - Country")

if __name__ == "__main__":
    load_movie_country()