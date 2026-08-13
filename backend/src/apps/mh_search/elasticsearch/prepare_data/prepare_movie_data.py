import os
import sys
from pathlib import Path
import django

CURRENT_FILE=Path(__file__).resolve()
SRC_DIR=CURRENT_FILE.parents[4]

if str(SRC_DIR) not in sys.path:
    sys.path.insert(0,str(SRC_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE","config.settings")
django.setup()

from apps.mh_movie.models import Movie

def build_movie_text(movie):
    return (movie.description_en or "").strip()

def get_movie_data():
    movies=Movie.objects.all()
    movie_data=[]

    for movie in movies:
        movie_text=build_movie_text(movie)
        movie_data.append({
            "movie_id":movie.id,
            "title_en":movie.title_en,
            "title_vn":movie.title_vn,
            "release_year":movie.release_year,
            "description_en":movie.description_en,
            "movie_text":movie_text,
        })

    return movie_data

def main():
    print("===== Chuẩn bị dữ liệu phim =====")
    movie_data=get_movie_data()
    total_movies=len(movie_data)
    print(f"Total movies: {total_movies}")

    non_empty=sum(1 for movie in movie_data if movie["movie_text"])
    empty=len(movie_data)-non_empty
    print(f"Phim có movie_text: {non_empty}")
    print(f"Phim không có movie_text: {empty}")

    print("===== Dữ liệu phim mẫu =====")
    for movie in movie_data[:5]:
        print("\nMovie ID:",movie["movie_id"])
        print("Title EN:",movie["title_en"])
        print("Title VN:",movie["title_vn"])
        print("Release year:",movie["release_year"])
        print("description_en",movie["description_en"])
        print("Movie text:",movie["movie_text"])

    print("===== Kết quả =====")
    if total_movies==3201:
        print("PASS")
    else:
        print(f"WARNING: Expected 3201 movies, but found {total_movies}.")

    if empty==0:
        print("PASS: All movies have movie_text.")
    else:
        print(f"WARNING: {empty} movies have empty movie_text.")

if __name__=="__main__":
    main()