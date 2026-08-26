from sentence_transformers import SentenceTransformer

MODEL_NAME = "BAAI/bge-m3"

_model = None

def get_embedding_model():
    global _model

    if _model is None:
        _model = SentenceTransformer(MODEL_NAME)

    return _model