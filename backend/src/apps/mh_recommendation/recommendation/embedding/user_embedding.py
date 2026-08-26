from .embedding_model import get_embedding_model
from ..recommend.user_profile import build_user_embedding_text


def embed_user_profile(profile):
    model=get_embedding_model()
    text=build_user_embedding_text(profile)

    embedding=model.encode(text, normalize_embeddings=True)
    return embedding