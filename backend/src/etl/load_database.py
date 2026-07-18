from pathlib import Path
import sys
import time

BASE_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()

from etl.load.load_platform import load_platform
from etl.load.load_movie import load_movie
from etl.load.load_director import load_director
from etl.load.load_actor import load_actor
from etl.load.load_country import load_country
from etl.load.load_genre import load_genre

from etl.load.load_movie_director import load_movie_director
from etl.load.load_movie_actor import load_movie_actor
from etl.load.load_movie_country import load_movie_country
from etl.load.load_movie_genre import load_movie_genre
from etl.load.load_movie_platform import load_movie_platform

def run_step(name, func):
    print("=" * 60)
    print(f"Đang chạy: {name}")

    start = time.time()
    func()
    end = time.time()

    print(f"Hoàn thành: {name}")
    print(f"Thời gian: {end-start:.2f}s")

def main():
    run_step("Load Platform", load_platform)
    run_step("Load Movie", load_movie)
    run_step("Load Director", load_director)
    run_step("Load Actor", load_actor)
    run_step("Load Country", load_country)
    run_step("Load Genre", load_genre)
    run_step("Load MovieDirector", load_movie_director)
    run_step("Load MovieActor", load_movie_actor)
    run_step("Load MovieCountry", load_movie_country)
    run_step("Load MovieGenre", load_movie_genre)
    run_step("Load MoviePlatform", load_movie_platform)

    print("=" * 60)
    print("Hoàn thành thêm dữ liệu.")

if __name__ == "__main__":
    main()