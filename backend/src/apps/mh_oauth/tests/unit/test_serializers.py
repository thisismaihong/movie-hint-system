from datetime import date
from unittest.mock import patch
from rest_framework.test import APIRequestFactory
from django.test import TestCase

from ..factories import UserFactory
from ...enums import GenderEnum
from ...serializers import RegisterInputSerializer, LoginInputSerializer, UpdateProfileInputSerializer, \
    ChangePasswordInputSerializer, CheckAvailabilityInputSerializer


class RegisterInputSerializerTestCase(TestCase):

    def get_valid_data(self):
        return {
            "username": "test",
            "password": "Abcd@1234",
            "email": "test@gmail.com",
            "gender": GenderEnum.FEMALE,
            "date_of_birth": "2000-08-29",
            "preferences": {
                "preferred_release_year_from": 2000,
                "preferred_release_year_to": 2025,
                "genres": [1, 2],
                "countries": [1, 2],
            },
        }
    def test_username_required(self):
        data = self.get_valid_data()
        data.pop("username")
        serializer = RegisterInputSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("username", serializer.errors)

    @patch("apps.mh_oauth.serializers.User.objects.filter")
    def test_username_already_exists(self, mock_filter):
        mock_filter.return_value.exists.return_value = True
        data = self.get_valid_data()
        serializer = RegisterInputSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("username", serializer.errors)

    def test_email_required(self):
        data = self.get_valid_data()
        data.pop("email")
        serializer = RegisterInputSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)

    @patch("apps.mh_oauth.serializers.User.objects.filter")
    def test_email_already_exists(self, mock_filter):
        mock_filter.return_value.exists.return_value = True
        data = self.get_valid_data()
        serializer = RegisterInputSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)

    def test_invalid_email(self):
        data = self.get_valid_data()
        data["email"] = "test@"
        serializer = RegisterInputSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)

    def test_invalid_password(self):
        data = self.get_valid_data()
        data["password"] = "abc"
        serializer = RegisterInputSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("password", serializer.errors)

    def test_invalid_date_of_birth(self):
        data = self.get_valid_data()
        data["date_of_birth"] = "2027-08-29"
        serializer = RegisterInputSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("non_field_errors", serializer.errors)
        self.assertEqual(
            serializer.errors["non_field_errors"][0],
            "Ngày sinh không hợp lệ."
        )

class LoginInputSerializerTestCase(TestCase):
    def get_valid_data(self):
        return {
            "username": "test",
            "password": "Abcd@1234",
        }

    def test_valid_login_data(self):
        data = self.get_valid_data()
        serializer = LoginInputSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_username_required(self):
        data = self.get_valid_data()
        data.pop("username")
        serializer = LoginInputSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("username", serializer.errors)

    def test_password_required(self):
        data = self.get_valid_data()
        data.pop("password")
        serializer = LoginInputSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("password", serializer.errors)

class UpdateProfileInputSerializerTestCase(TestCase):
    def get_valid_data(self):
        return {
            "first_name": "test",
            "last_name": "test",
        }

    def test_valid_update_profile(self):
        data = self.get_valid_data()
        serializer = UpdateProfileInputSerializer(data=data)

        self.assertTrue(serializer.is_valid())

    def test_avatar_can_be_null(self):
        data = {
            "first_name": "test",
            "last_name": "test",
            "avatar": None,
        }
        serializer = UpdateProfileInputSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertIsNone(serializer.validated_data["avatar"])

class ChangePasswordInputSerializerTestCase(TestCase):
    def setUp(self):
        self.user=UserFactory.create()
        request=APIRequestFactory().post("/")
        request.user=self.user
        self.context={"request":request}

    def get_valid_data(self):
        return {
            "old_password":"Abcd@1234",
            "new_password":"Abc@1234",
            "confirm_password":"Abc@1234",
        }

    def get_serializer(self, data):
        return ChangePasswordInputSerializer(data=data,context=self.context)

    def test_valid_change_password(self):
        serializer = self.get_serializer(self.get_valid_data())
        self.assertTrue(serializer.is_valid())

    def test_old_password_incorrect(self):
        data = self.get_valid_data()
        data["old_password"] = "wrong"
        serializer = self.get_serializer(data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("non_field_errors", serializer.errors)
        self.assertEqual(
            str(serializer.errors["non_field_errors"][0]),
            "Mật khẩu cũ chưa đúng"
        )

    def test_new_password_not_match(self):
        data = self.get_valid_data()
        data["confirm_password"] = "different"
        serializer = self.get_serializer(data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("non_field_errors", serializer.errors)
        self.assertEqual(
            str(serializer.errors["non_field_errors"][0]),
            "Mật khẩu mới không khớp"
        )

    def test_new_password_same_old(self):
        data = self.get_valid_data()
        data["new_password"] = "Abcd@1234"
        data["confirm_password"] = "Abcd@1234"
        serializer = self.get_serializer(data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("non_field_errors", serializer.errors)
        self.assertEqual(
            str(serializer.errors["non_field_errors"][0]),
            "Mật khẩu mới phải khác mật khẩu cũ"
        )

class CheckAvailabilityInputSerializerTestCase(TestCase):
    def get_valid_data(self):
        return {
            "username": "test",
            "email": "test@gmail.com"
        }

    def test_valid_data(self):
        serializer = CheckAvailabilityInputSerializer(data=self.get_valid_data())

        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data["username"], "test")
        self.assertEqual(serializer.validated_data["email"], "test@gmail.com")

    def test_invalid_email(self):
        data=self.get_valid_data()
        data["email"]="test@"
        serializer = CheckAvailabilityInputSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)
