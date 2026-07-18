from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from . import serializers, services, selectors


class AuthViewSet(viewsets.ViewSet):
   @action(methods=["post"], detail=False, url_path="register")
   def register(self, request):
       serializer=serializers.RegisterInputSerializer(data=request.data)
       serializer.is_valid(raise_exception=True)
       user=services.register_service(serializer.validated_data)
       user=selectors.get_current_user(user)
       
       return Response(
           serializers.UserOutputSerializer(user).data,
           status=status.HTTP_201_CREATED
       )