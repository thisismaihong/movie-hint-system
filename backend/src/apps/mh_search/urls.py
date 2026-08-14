from rest_framework.routers import DefaultRouter
from .views import MovieSearchView


router = DefaultRouter()

router.register(
    "search",
    MovieSearchView,
    basename="search"
)

urlpatterns = router.urls