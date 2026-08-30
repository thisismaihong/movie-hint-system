from unittest import TestCase
from ...models import User

from ..factories import UserFactory
from ... import selectors

class GetCurrentUserTestCase(TestCase):
    def test_get_current_user(self):
        user=UserFactory.create()
        result=selectors.get_current_user(user)

        self.assertIsNotNone(result)
        self.assertEqual(result.id, user.id)
        self.assertEqual(result.username, user.username)

    def test_get_current_user_not_found(self):
        user=User(id=100)
        result=selectors.get_current_user(user)

        self.assertIsNone(result)


class GetUserByIdTestCase(TestCase):
    def test_get_user_by_id(self):
        user = User.objects.create_user(
            username="get_user_by_id",
            email="get_user_by_id@gmail.com",
            password="Abcd@1234",
        )

        result = selectors.get_user_by_id(user.id)

        self.assertEqual(result.id, user.id)
        self.assertEqual(result.username, user.username)

    def test_get_user_by_id_not_found(self):
        with self.assertRaises(User.DoesNotExist):
            selectors.get_user_by_id(100)

class GetUserByUsernameTestCase(TestCase):
    def test_get_user_by_username(self):
        user = User.objects.create_user(
            username="get_user_by_name",
            email="get_user_by_name@gmail.com",
            password="Abcd@1234",
        )
        result = selectors.get_user_by_username(user.username)
        self.assertIsNotNone(result)
        self.assertEqual(result.id, user.id)
        self.assertEqual(result.username, user.username)

    def test_get_user_by_username_not_found(self):
        result = selectors.get_user_by_username("haha")
        self.assertIsNone(result)

class CheckUsernameExistsTestCase(TestCase):
    def test_check_username_exists(self):
        user = User.objects.create_user(
            username="check_username",
            email="check_username@gmail.com",
            password="Abcd@1234",
        )
        result = selectors.check_username_exists(user.username)

        self.assertTrue(result)

    def test_username_not_exists(self):
        result = selectors.check_username_exists("haha")
        self.assertFalse(result)

    def test_username_exists_iexact(self):
        User.objects.create_user(
            username="TestUser",
            email="testuser@gmail.com",
            password="Abcd@1234",
        )
        result = selectors.check_username_exists("testuser")

        self.assertTrue(result)

class CheckEmailExistsTestCase(TestCase):
    def test_check_email_exists(self):
        user = User.objects.create_user(
            username="check_email_exists",
            email="check_email_exists@gmail.com",
            password="Abcd@1234",
        )
        result = selectors.check_email_exists(user.email)

        self.assertTrue(result)

    def test_email_not_exists(self):
        result = selectors.check_email_exists("haha@gmail.com")
        self.assertFalse(result)

    def test_email_exists_iexact(self):
        User.objects.create_user(
            username="testuser_email_exists",
            email="testuser_email_exists@gmail.com",
            password="Abcd@1234",
        )
        result = selectors.check_email_exists("TestUser_email_exists@gmail.com")

        self.assertTrue(result)




