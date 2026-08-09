from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet, GenericViewSet

from . import services, serializers,selectors
from .recommendation.cache import invalidate_recommendation_cache
from .recommendation.reason.recommendation_context import build_recommendation_context
from .recommendation.reason.recommendation_reason import generate_recommendation_reason
from ..mh_recommendation.recommendation.recommend.candidate import get_candidate_movies
from ..mh_recommendation.recommendation.recommend.user_profile import build_user_profile
from ..mh_movie.paginators import MoviePaginator
from ..mh_recommendation.recommendation.cache import get_cached_recommendations, set_cached_recommendations

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
        invalidate_recommendation_cache(request.user.id) #sở thích thay đổi thì phải xóa cache cũ
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
        serializer=serializers.FavoriteMovieOutputSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)
    def create(self, request):
        serializer=serializers.FavoriteMovieInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        services.add_favorite_movie(request.user, serializer.validated_data["movie_id"])
        invalidate_recommendation_cache(request.user.id) #hành vi thay đổi thì phải xóa cache cũ
        return Response({"detail":"Đã thêm vào danh sách yêu thích"}, status=status.HTTP_201_CREATED)
    def destroy(self, request, pk=None):
        services.delete_favorite_movie(request.user, pk)
        invalidate_recommendation_cache(request.user.id) #hành vi thay đổi thì phải xóa cache cũ
        return Response({"detail":"Đã xóa khỏi danh sách yêu thích"},status=status.HTTP_200_OK)


class RecommendationViewSet(GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        #Luu cache
        user_id=request.user.id
        cached_recommendations=get_cached_recommendations(user_id)
        #Có cache thì trả luôn
        if cached_recommendations is not None:
            serializer=serializers.RecommendationOutputSerializer(cached_recommendations, many=True)
            return Response(serializer.data)

        #Không có cache mới tính recommendations
        print("--- RUNNING RECOMMENDATION + GEMINI ---")
        user_profile=build_user_profile(request.user)
        candidates=get_candidate_movies(user_profile)
        context=build_recommendation_context(user_profile, candidates)
        candidates=generate_recommendation_reason(context)

        #Lưu kq cache vào redis
        set_cached_recommendations(user_id, candidates)

        serializer=serializers.RecommendationOutputSerializer(candidates, many=True)
        return Response(serializer.data)