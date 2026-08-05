from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet, GenericViewSet

from . import services, serializers
from .paginators import MoviePaginator


class MoviesViewSet(GenericViewSet):
    permission_classes = [permissions.AllowAny]
    pagination_class = MoviePaginator

    def list(self, request):
        filters={
            "q": request.query_params.get("q"),
            "release_year": request.query_params.get("release_year"),
            "country": request.query_params.get("country"),
            "genre": request.query_params.get("genre")
        }
        movies=services.get_movies_service(filters)
        page=self.paginate_queryset(movies)
        serializer=serializers.MovieOutputSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def retrieve(self, request, pk=None):
        movie=services.get_movie_detail_service(request.user, pk)
        serializer = serializers.MovieDetailOutputSerializer(movie)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def genres(self, request):
        genres=services.get_all_genres_service()
        serializer=serializers.GenreSerializer(genres, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def countries(self, request):
        countries=services.get_all_countries_service()
        serializer=serializers.CountrySerializer(countries, many=True)
        return Response(serializer.data)

