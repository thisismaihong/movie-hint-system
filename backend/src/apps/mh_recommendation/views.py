from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet, GenericViewSet

from . import services, serializers,selectors
from ..mh_movie.paginators import MoviePaginator
from ..mh_movie import serializers as movie_serializers

class UserPreferenceViewSet(ViewSet):
    @action(detail=False, methods=['get','put'], permission_classes=[permissions.IsAuthenticated], url_path="preferences",)
    def preferences(self, request):
        if request.method == 'GET':
            preferences=services.get_preferences_service(request.user)
            serializer=serializers.PreferencesOutputSerializer(preferences)
            return Response(serializer.data)

        serializer = serializers.PreferencesInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        preferences = services.update_preferences_service(request.user, serializer.validated_data)
        output = serializers.PreferencesOutputSerializer(preferences)
        return Response(output.data)

class FavoriteMovieViewSet(GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = MoviePaginator
    def list(self, request):
        filters={
            "q": request.query_params.get('q'),
            "release_year": request.query_params.get('release_year'),
            "country": request.query_params.get('country'),
            "genre": request.query_params.get('genre')
        }
        favorites=selectors.get_favorite_movies(request.user, filters)
        page=self.paginate_queryset(favorites)
        serializer=movie_serializers.MovieOutputSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)
    def create(self, request):
        serializer=serializers.FavoriteMovieInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        services.add_favorite_movie(request.user, serializer.validated_data["movie_id"])
        return Response({"detail":"Đã thêm vào danh sách yêu thích"}, status=status.HTTP_201_CREATED)
    def destroy(self, request, pk=None):
        services.delete_favorite_movie(request.user, pk)
        return Response({"detail":"Đã xóa khỏi danh sách yêu thích"},status=status.HTTP_200_OK)