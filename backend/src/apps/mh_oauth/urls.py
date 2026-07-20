from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import AuthViewSet

router = DefaultRouter()
router.register("oauth", AuthViewSet, basename="oauth")
urlpatterns = router.urls + [
    path(
        "oauth/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
]