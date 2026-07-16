from pathlib import Path
import pandas as pd


# RAW_PATH=Path("backend/src/etl/datasets/raw/netflix_movies.csv")
# OUTPUT_PATH=Path("backend/src/etl/datasets/processed/netflix_movies_only.csv")

BASE_DIR = Path(__file__).resolve().parent.parent

RAW_PATH = BASE_DIR / "datasets" / "raw" / "netflix_movies.csv"
OUTPUT_PATH = BASE_DIR / "datasets" / "processed" / "netflix_movies_only.csv"

def filter_movie():
    df=pd.read_csv(RAW_PATH, encoding="latin-1")
    df=df[df["type"].str.lower()=="movie"]
    df.to_csv(OUTPUT_PATH, index=False, encoding="utf-8-sig")
    print(f"Saved {len(df)} movies to {OUTPUT_PATH}")

if __name__=="__main__":
    filter_movie()