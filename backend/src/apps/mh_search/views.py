import os
from dotenv import load_dotenv
from elasticsearch import Elasticsearch
from rest_framework import status
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework.viewsets import GenericViewSet

from .elasticsearch.rag.search_context import build_search_context
from .elasticsearch.rag.search_reason import generate_search_reason
from .elasticsearch.retrieval.search_movies import search_movies
from .elasticsearch.retrieval.embed_query import load_embedding_model, embed_query
from .serializers import SearchOutputSerializer, SearchInputSerializer
from ..mh_oauth.permissions import IsUser

load_dotenv()
ELASTICSEARCH_URL=os.getenv("ELASTICSEARCH_URL")
TOP_K=20

class MovieSearchView(GenericViewSet):
    permission_classes = [IsUser]

    @extend_schema(
        request=SearchInputSerializer,
        responses=SearchOutputSerializer(many=True)
    )
    def create(self, request):
        serializer=SearchInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        query=serializer.validated_data["description"].strip()
        elasticsearch=Elasticsearch(ELASTICSEARCH_URL)
        if not elasticsearch.ping():
            return Response({"detail":"Elasticsearch chưa được kết nối!"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        model=load_embedding_model()
        query_embedding=embed_query(model, query)
        hits=search_movies(elasticsearch, query_embedding, top_k=TOP_K)

        candidates=[]
        for hit in hits:
            movie=hit["_source"]
            candidates.append({
                "movie_id": movie["movie_id"],
                "title_en": movie["title_en"],
                "title_vn": movie["title_vn"],
                "release_year": movie["release_year"],
                "score": hit["_score"],
                "movie_text": movie["movie_text"]
            })
        context=build_search_context(query, candidates)
        selected_movies=generate_search_reason(context)
        candidate_map={movie["movie_id"] : movie for movie in candidates}

        results=[]
        for item in selected_movies:
            movie_id=item["movie_id"]
            if movie_id not in candidate_map:
                continue
            movie=candidate_map[movie_id]
            results.append({
                "movie_id": movie["movie_id"],
                "title_en": movie["title_en"],
                "title_vn": movie["title_vn"],
                "release_year": movie["release_year"],
                "score": movie["score"],
                "reason": item["reason"]
            })

        serializer=SearchOutputSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
