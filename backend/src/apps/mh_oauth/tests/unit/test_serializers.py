from datetime import date
from unittest.mock import patch

from django.test import TestCase

from ...enums import GenderEnum
from ...serializers import RegisterInputSerializer


class RegisterInputSerializerTestCase(TestCase):

    @patch("apps.mh_oauth.serializers.User.objects.filter")
    def test_valid_register_data(self, mock_filter):
        mock_filter.return_value.exists.return_value = False

        data = {
            "username": "test",
            "password": "Abcd@1234",
            "email": "test@gmail.com",
            "gender": GenderEnum.FEMALE,
            "date_of_birth": "2026-08-29",
            "preferences": {
                "preferred_release_year_from": 2000,
                "preferred_release_year_to": 2025,
                "genres": [1, 2],
                "countries": [1, 2],
            }
        }

        serializer = RegisterInputSerializer(data=data)

        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data["username"], data["username"])
        self.assertEqual(serializer.validated_data["email"], data["email"])
        self.assertEqual(serializer.validated_data["date_of_birth"], date(2026, 8, 29))