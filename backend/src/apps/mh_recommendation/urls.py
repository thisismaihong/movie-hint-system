from rest_framework.routers import DefaultRouter

from .views import UserPreferenceViewSet, FavoriteMovieViewSet, RecommendationViewSet

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

urlpatterns = router.urls
