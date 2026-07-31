from rest_framework.routers import DefaultRouter

from .views import MoviesViewSet

router=DefaultRouter()
router.register('movies', MoviesViewSet, basename='movies')
urlpatterns = router.urls