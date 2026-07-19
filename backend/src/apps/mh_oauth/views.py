from rest_framework.permissions import IsAuthenticated
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

   @action(detail=False, methods=["post"])
   def login(self, request):
       serializer=serializers.LoginInputSerializer(data=request.data)
       serializer.is_valid(raise_exception=True)
       result=services.login_service(serializer.validated_data)
       output=serializers.LoginOutputSerializer(result)
       return Response(output.data, status=status.HTTP_200_OK)

   @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
   def profile(self, request):
       user=services.profile_service(request.user)
       serializer=serializers.ProfileOutputSerializer(user)
       return Response(serializer.data)