import os
import sys
from pathlib import Path
import django

BASE_DIR = Path(__file__).resolve().parents[2]

sys.path.insert(0, str(BASE_DIR))


def setup_django():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    django.setup()