from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet, GenericViewSet

from . import services, serializers,selectors
from .recommendation.cache import invalidate_recommendation_cache
from .services import get_recommendations_service
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

    @action(detail=False, methods=["delete"], url_path="movie")
    def delete_by_movie_id(self, request):
        movie_id=request.query_params.get('movie_id')
        result=services.delete_favorite_movie_by_movieid_service(request.user, movie_id)
        if not result:
            return Response(
                {"detail": "Phim chưa có trong danh sách yêu thích"},
                status=status.HTTP_400_BAD_REQUEST
            )
        invalidate_recommendation_cache(request.user.id)
        return Response(
            {"detail": "Đã xóa khỏi danh sách yêu thích"},
            status=status.HTTP_200_OK
        )

class RecommendationViewSet(GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = MoviePaginator

    def list(self, request):
        user_id = request.user.id
        recommendations = get_cached_recommendations(user_id)
        print("CACHE:", recommendations is not None)
        if recommendations is None:
            print("RUNNING ELASTICSEARCH RECOMMENDATION")
            recommendations = get_recommendations_service(
                request.user,
                top_k=40
            )
            set_cached_recommendations(
                user_id,
                recommendations
            )

        filters = {
            "q": request.query_params.get("q"),
            "release_year": request.query_params.get("release_year"),
            "country": request.query_params.get("country"),
            "genre": request.query_params.get("genre"),
        }
        recommendations = selectors.filter_recommendations(
            recommendations,
            filters
        )

        page = self.paginate_queryset(recommendations)
        serializer = serializers.RecommendationOutputSerializer(
            page,
            many=True
        )
        return self.get_paginated_response(serializer.data)

class FeedbackViewSet(GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        movie_id=request.query_params.get('movie_id')
        if not movie_id:
            return Response(
                {"detail": "Phim không tồn tại."},
                status=status.HTTP_400_BAD_REQUEST
            )
        feedbacks=services.get_feedbacks_by_movie_service(movie_id)
        if feedbacks is None:
            return Response(
                {"detail": "Phim không tồn tại."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer=serializers.FeedbackOutputSerializer(feedbacks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer=serializers.FeedbackInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        feedback=services.create_feedback_service(
            request.user,
            serializer.validated_data["movie_id"],
            serializer.validated_data["content"]
        )
        if not feedback:
            return Response({"detail":"Phim không tồn tại."}, status=status.HTTP_400_BAD_REQUEST)

        result=serializers.FeedbackOutputSerializer(feedback)
        return Response(result.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None):
        deleted=services.delete_feedback_service(request.user, pk)
        if not deleted:
            return Response(
                {"detail": "Feedback không tồn tại hoặc bạn không có quyền xóa."},
                status=status.HTTP_404_NOT_FOUND
            )
        return Response(
            {"detail": "Xóa feedback thành công."},
            status=status.HTTP_200_OK
        )
