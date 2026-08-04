from rest_framework.routers import DefaultRouter

from .views import UserPreferenceViewSet, FavoriteMovieViewSet

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

urlpatterns = router.urls
