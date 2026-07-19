from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from . import services, serializers


class MoviesViewSet(ViewSet):
    @action(detail=False, methods=["get"])
    def genres(self, request):
        genres=services.get_all_genres_service()
        serializer=serializers.GenreSerializer(genres, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def countries(self, request):
        countries=services.get_all_countries_service()
        serializer=serializers.CountrySerializer(countries, many=True)
        return Response(serializer.data)