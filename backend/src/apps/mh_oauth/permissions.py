from rest_framework import permissions
from .enums import RoleEnum

class IsUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role==RoleEnum.USER

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role==RoleEnum.ADMIN