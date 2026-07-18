from rest_framework.routers import DefaultRouter

from .views import AuthViewSet

router = DefaultRouter()
router.register("oauth", AuthViewSet, basename="oauth")  #/oauth/register/
urlpatterns = router.urls