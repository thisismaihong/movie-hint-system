from unittest import TestCase

from ...models import User
from ... import services


class ChangePasswordTestCase(TestCase):

    def test_change_password_success(self):
        user=User.objects.get(username='testuser')
        data={
            "new_password": "Abcd@1234",
        }
        result=services.change_password_service(user, data)
        self.assertEqual(result.id,user.id)
        user.refresh_from_db()
        self.assertTrue(user.check_password(data["new_password"]))
