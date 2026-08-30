from ..models import User

class UserFactory:
    @staticmethod
    def create(**kwargs):
        defaults={
            "username": "test",
            "email":"test@gmail.com",
            "password":"Abcd@1234",
        }
        defaults.update(kwargs)
        return User.objects.create_user(**defaults)