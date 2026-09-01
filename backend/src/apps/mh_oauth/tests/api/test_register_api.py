from ...models import User
from rest_framework import status
from rest_framework.test import APITestCase
from ...enums import GenderEnum
from ....mh_movie.models import Genre, Country


class RegisterAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.genre1 = Genre.objects.create(name="Action")
        cls.genre2 = Genre.objects.create(name="Comedy")

        cls.country1 = Country.objects.create(name="Vietnam")
        cls.country2 = Country.objects.create(name="Korea")

        cls.existing_user = User.objects.create_user(
            username="testuser",
            email="testuser@gmail.com",
            password="Abcd@1234",
        )

    def get_valid_data(self):
        return {
            "username": "register_api_test",
            "password": "Abcd@1234",
            "email": "register_api_test@gmail.com",
            "gender": GenderEnum.FEMALE,
            "date_of_birth": "2000-01-01",
            "preferences": {
                "preferred_release_year_from": 2000,
                "preferred_release_year_to": 2025,
                "genres": [self.genre1.id, self.genre2.id],
                "countries": [self.country1.id, self.country2.id],
            }
        }

    def test_register_success(self):
        data=self.get_valid_data()
        response=self.client.post("/api/oauth/register/", data, format='json')
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    def test_register_username_already_exists(self):
        data = self.get_valid_data()
        data["username"] = self.existing_user.username

        response=self.client.post("/api/oauth/register/", data, format='json')
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)

    def test_register_email_already_exists(self):
        data=self.get_valid_data()
        data["email"] = self.existing_user.email

        response=self.client.post("/api/oauth/register/", data, format='json')
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_register_invalid_email(self):
        data=self.get_valid_data()
        data["email"]="test@"

        response=self.client.post("/api/oauth/register/", data, format='json')
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_register_invalid_password(self):
        data=self.get_valid_data()
        data["password"]="abc"

        response=self.client.post("/api/oauth/register/", data, format='json')
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    def test_register_invalid_date_of_birth(self):
        data=self.get_valid_data()
        data["date_of_birth"]="2027-01-01"

        response=self.client.post("/api/oauth/register/", data, format='json')
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertIn("non_field_errors", response.data)

    def test_register_missing_required_field(self):
        required_fields = [
            "username",
            "password",
            "email",
            "gender",
            "date_of_birth",
            "preferences",
        ]
        for f in required_fields:
            data=self.get_valid_data()
            data.pop(f)
            response=self.client.post("/api/oauth/register/", data, format='json')
            self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
            self.assertIn(f, response.data)

