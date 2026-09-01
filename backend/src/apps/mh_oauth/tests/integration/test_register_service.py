from unittest import TestCase
from ...services import register_service
from ....mh_movie.models import Genre, Country
from ...models import User
from ....mh_recommendation.models import Preferences, PreferenceGenre, PreferenceCountry

class RegisterServiceTest(TestCase):
    def test_register_service_success(self):
        genre1 = Genre.objects.get(name="Hài hước")
        genre2 = Genre.objects.get(name="Lãng mạn")
        country1 = Country.objects.get(name="Hàn Quốc")

        data = {
            "username": "testuser1",
            "email": "testuser1@example.com",
            "password": "Abcd@1234",
            "preferences": {
                "genres": [genre1.id, genre2.id],
                "countries": [country1.id],
                "preferred_release_year_from": 2016,
                "preferred_release_year_to": 2026,
            }
        }

        user = register_service(data)

        self.assertIsNotNone(user)
        self.assertEqual(user.username, "testuser1")
        self.assertEqual(user.email, "testuser1@example.com")

        preferences = Preferences.objects.get(user=user)

        self.assertEqual(preferences.preferred_release_year_from,2016)
        self.assertEqual(preferences.preferred_release_year_to, 2026)

        preferred_genres = PreferenceGenre.objects.filter(preference=preferences)
        self.assertEqual(preferred_genres.count(), 2)
        self.assertEqual(set(preferred_genres.values_list("genre_id", flat=True)), {genre1.id, genre2.id})

        preferred_countries = PreferenceCountry.objects.filter(preference=preferences)
        self.assertEqual(preferred_countries.count(), 1)
        self.assertEqual(preferred_countries.first().country_id, country1.id)



