from django.test import TestCase
from ... import selectors
from ...models import Preferences, PreferenceGenre, PreferenceCountry, FavoriteMovie, Feedback
from ....mh_oauth.models import User
from ....mh_movie.models import Genre, Country, Movie


class GetPreferencesTestCase(TestCase):
    def test_get_preferences(self):
        user = User.objects.create_user(
            username="get_preferences",
            email="get_preferences@gmail.com",
            password="Abcd@1234",
        )

        preferences = Preferences.objects.create(
            user=user,
        )

        result=selectors.get_preferences(user)

        self.assertIsNotNone(result)
        self.assertEqual(result.id, preferences.id)
        self.assertEqual(result.user.id, user.id)

    def test_get_preferences_not_found(self):
        user = User.objects.create_user(
            username="get_preferences_not_found",
            email="get_preferences_not_found@gmail.com",
            password="Abcd@1234",
        )
        result=selectors.get_preferences(user)

        self.assertIsNone(result)

    def test_get_preferences_with_genres_and_countries(self):
        user = User.objects.create_user(
            username="with_preferences",
            email="with_preferences@gmail.com",
            password="Abcd@1234",
        )

        preferences = Preferences.objects.create(user=user)
        genre = Genre.objects.create(name="Action")
        country = Country.objects.create(name="Korea")

        PreferenceGenre.objects.create(
            preference=preferences,
            genre=genre
        )
        PreferenceCountry.objects.create(
            preference=preferences,
            country=country
        )

        result = selectors.get_preferences(user)

        self.assertIsNotNone(result)
        self.assertEqual(result.preference_genres.count(), 1)
        self.assertEqual(result.preference_genres.first().genre.name,"Action")
        self.assertEqual(result.preference_countries.count(), 1)
        self.assertEqual(result.preference_countries.first().country.name,"Korea")

class GetFavoriteMoviesTestCase(TestCase):
    def test_get_favorite_movies(self):
        user=User.objects.create_user(
            username="favorite_user",
            email="favorite_user@gmail.com",
            password="Abcd@1234"
        )
        movie = Movie.objects.create(
            title_en="The Avengers",
            title_vn="Biệt Đội Siêu Anh Hùng",
            release_year=2012
        )
        FavoriteMovie.objects.create(user=user, movie=movie)
        result = selectors.get_favorite_movies(user, {})

        self.assertEqual(result.count(), 1)
        self.assertEqual(result.first().movie.id, movie.id)

    def test_get_favorite_movies_not_found(self):
        user=User.objects.create_user(
            username="no_favorites",
            email="no_favorites@gmail.com",
            password="Abcd@1234"
        )
        result=selectors.get_favorite_movies(user,{})
        self.assertEqual(result.count(), 0)

    def test_get_favorite_movie_by_movie_id(self):
        user=User.objects.create_user(
            username="favorite_by_movie",
            email="favorite_by_movie@gmail.com",
            password="Abcd@1234"
        )
        movie = Movie.objects.create(
            title_en="The Avengers",
            title_vn="Biệt Đội Siêu Anh Hùng",
            release_year=2012
        )
        favorite=FavoriteMovie.objects.create(user=user, movie=movie)
        result = selectors.get_favorite_movie_by_movie_id(user, movie.id)

        self.assertIsNotNone(result)
        self.assertEqual(result.id, favorite.id)
        self.assertEqual(result.movie.id, movie.id)
        self.assertEqual(result.user.id, user.id)

    def test_get_favorite_movie_by_movie_id_not_found(self):
        user = User.objects.create_user(
            username="not_favorite",
            email="not_favorite@gmail.com",
            password="Abcd@1234",
        )

        movie = Movie.objects.create(
            title_en="Titanic",
            title_vn="Titanic",
            release_year=1997,
        )
        result = selectors.get_favorite_movie_by_movie_id(user, movie.id)

        self.assertIsNone(result)

    def test_is_favorite_movie(self):
        user = User.objects.create_user(
            username="is_favorite",
            email="is_favorite@gmail.com",
            password="Abcd@1234",
        )

        movie = Movie.objects.create(
            title_en="The Avengers",
            title_vn="Biệt Đội Siêu Anh Hùng",
            release_year=2012,
        )
        FavoriteMovie.objects.create(user=user, movie=movie)
        result = selectors.is_favorite_movie(user, movie.id)

        self.assertTrue(result)

    def test_is_favorite_movie_not_found(self):
        user = User.objects.create_user(
            username="not_favorite",
            email="not_favorite2@gmail.com",
            password="Abcd@1234",
        )
        movie = Movie.objects.create(
            title_en="Titanic",
            title_vn="Titanic",
            release_year=1997,
        )
        result = selectors.is_favorite_movie(user, movie.id)

        self.assertFalse(result)

class GetFeedbacksByMovieTestCase(TestCase):
    def test_get_feedbacks_by_movie(self):
        user = User.objects.create_user(
            username="feedback_user",
            email="feedback_user@gmail.com",
            password="Abcd@1234"
        )
        movie = Movie.objects.create(
            title_en="The Avengers",
            title_vn="Biệt Đội Siêu Anh Hùng",
            release_year=2012
        )
        feedback = Feedback.objects.create(
            user=user,
            movie=movie,
            content="Phim rất hay."
        )
        result=selectors.get_feedbacks_by_movie(movie.id)

        self.assertEqual(result.count(), 1)
        self.assertEqual(result.first().id, feedback.id)
        self.assertEqual(result.first().user.id, user.id)
        self.assertEqual(result.first().movie.id, movie.id)
        self.assertEqual(result.first().content, "Phim rất hay.")

    def test_get_feedbacks_by_movie_not_found(self):
        movie = Movie.objects.create(
            title_en="The Avengers",
            title_vn="Biệt Đội Siêu Anh Hùng",
            release_year=2012,
        )
        result = selectors.get_feedbacks_by_movie(movie.id)

        self.assertEqual(result.count(), 0)



