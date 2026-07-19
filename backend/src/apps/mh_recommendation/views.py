from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from . import services, serializers


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
        return Response(output.data)