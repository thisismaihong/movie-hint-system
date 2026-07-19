from rest_framework.routers import DefaultRouter

from .views import UserPreferenceViewSet

router = DefaultRouter()
router.register('user', UserPreferenceViewSet, basename='user')
urlpatterns = router.urls