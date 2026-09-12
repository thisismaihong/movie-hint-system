from django.test import TestCase

from ....mh_oauth.models import User
from ....mh_movie.models import Movie, Genre, Country, MovieGenre, MovieCountry
from ...models import Preferences
from ...serializers  import PreferencesInputSerializer

class PreferencesInputSerializerTestCase(TestCase):
    def test_valid_data(self):
        data={
            "preferred_release_year_from": 2000,
            "preferred_release_year_to": 2020,
            "genres": [1, 2],
            "countries": [1, 2],
        }
        serializer=PreferencesInputSerializer(data=data)

        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['preferred_release_year_from'], 2000)
        self.assertEqual(serializer.validated_data['preferred_release_year_to'], 2020)

    def test_invalid_release_year_range(self):
        data = {
            "preferred_release_year_from": 2020,
            "preferred_release_year_to": 2000,
            "genres": [1],
            "countries": [1],
        }
        serializer = PreferencesInputSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("non_field_errors", serializer.errors)



