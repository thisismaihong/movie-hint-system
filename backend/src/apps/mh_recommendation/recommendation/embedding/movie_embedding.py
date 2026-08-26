from .embedding_model import get_embedding_model
from ..recommend.movie_profile import build_movie_embedding_text


def embed_movie_profile(profile):
    model = get_embedding_model()
    text = build_movie_embedding_text(profile)

    embedding = model.encode(text, normalize_embeddings=True)
    return embedding