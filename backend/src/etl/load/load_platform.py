from pathlib import Path
import sys
BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR))

from etl.utils.django_setup import setup_django
setup_django()
from apps.mh_movie.models import Platform


def load_platform():
    platform, created=Platform.objects.get_or_create(name="Netflix", defaults={"url": "https://www.netflix.com"})
    if created:
        print("Đã tạo nền tảng Netflix.")
    else:
        print("Nền tảng Netflix đã tồn tại.")

if __name__ == "__main__":
    load_platform()