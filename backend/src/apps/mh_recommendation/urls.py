from rest_framework.routers import DefaultRouter

from .views import UserPreferenceViewSet, FavoriteMovieViewSet, RecommendationViewSet, FeedbackViewSet

router = DefaultRouter()
router.register(
    "user",
    UserPreferenceViewSet,
    basename="user",
)

router.register(
    "favorites",
    FavoriteMovieViewSet,
    basename="favorites",
)

router.register(
    "recommendation/movies",
    RecommendationViewSet,
    basename="recommendation"
)

router.register(
    "feedbacks",
    FeedbackViewSet,
    basename="feedbacks"
)

urlpatterns = router.urls
