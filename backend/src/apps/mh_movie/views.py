from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet, GenericViewSet

from . import services, serializers, selectors
from .paginators import MoviePaginator
from rest_framework import status
from ..mh_oauth.permissions import IsUser, IsAdmin
from rest_framework.parsers import FormParser, MultiPartParser

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

    @action(detail=True, methods=["post"], url_path="translate")
    def translate(self, request, pk=None):
        movie=services.translate_description_service(pk)
        return Response({
            "movie_id":movie.id,
            "description_en":movie.description_en,
            "description_vn":movie.description_vn,
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="summary", permission_classes=[permissions.IsAuthenticated])
    def summary(self, request, pk=None):
        movie = selectors.get_movie_by_id(pk)
        description_summary = services.summarize_description_service(pk)

        return Response({
            "movie_id": pk,
            "description_en": movie.description_en,
            "description_summary": description_summary,
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"], url_path="suggest", permission_classes=[IsUser])
    def suggest(self, request):
        serializer=serializers.MovieSuggestionInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        movie=services.suggest_movie_service(request.user, serializer.validated_data)
        result=serializers.MovieSuggestionOutputSerializer(movie)
        return Response(
            result.data,
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["get"], url_path="suggested", permission_classes=[IsAdmin])
    def suggested_movies(self, request):
        movies=services.get_suggested_movies_service()
        page=self.paginate_queryset(movies)
        serializer=serializers.SuggestedMovieOutputSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @action(detail=True, methods=["get", "delete"], url_path="suggested", permission_classes=[IsAdmin])
    def suggested(self, request, pk=None):
        if request.method == "GET":
            movie = selectors.get_suggested_movie_by_id(pk)
            serializer = serializers.SuggestedMovieOutputSerializer(movie)

            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        if request.method == "DELETE":
            services.delete_rejected_movie_suggestion_service(pk)

            return Response(
                {"detail": "Xóa phim đề xuất thành công."},
                status=status.HTTP_200_OK,
            )

    @action(detail=True, methods=["post"], url_path="suggested/approve", permission_classes=[IsAdmin], parser_classes=[MultiPartParser, FormParser])
    def approve_suggested(self, request, pk=None):
        serializer=serializers.ApproveMovieSuggestionInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        movie=services.approve_movie_suggestion_service(pk, serializer.validated_data)
        result=serializers.MovieDetailOutputSerializer(movie)

        return Response(result.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="suggested/reject", permission_classes=[IsAdmin])
    def reject_suggestion(self, request, pk=None):
        serializer=serializers.RejectMovieSuggestionInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        movie=services.reject_movie_suggestion_service(pk, serializer.validated_data)
        result=serializers.SuggestedMovieOutputSerializer(movie)
        return Response(result.data, status=status.HTTP_200_OK)


    @action(detail=False, methods=["get"], url_path="my-suggestions", permission_classes=[IsUser])
    def my_suggestions(self, request):
        suggestions=selectors.get_my_suggested_movies(request.user)
        page=self.paginate_queryset(suggestions)
        serializer=serializers.MySuggestedMovieOutputSerializer(page, many=True)

        return self.get_paginated_response(serializer.data)

    @action(detail=True, methods=["get"], url_path="my-suggestions", permission_classes=[IsUser])
    def my_suggestion_detail(self, request, pk=None):
        movie=services.get_my_suggested_movie_detail_service(request.user, pk)
        serializer=serializers.MySuggestedMovieDetailOutputSerializer(movie)
        return Response(serializer.data, status=status.HTTP_200_OK)
