from unittest import TestCase
from unittest.mock import patch
from ... import services

class CheckAvailabilityServiceTestCase(TestCase):

    @patch("apps.mh_oauth.services.selectors.check_email_exists")
    @patch("apps.mh_oauth.services.selectors.check_username_exists")
    def test_both_available(self, mock_username_exists, mock_email_exists):
        mock_username_exists.return_value = False
        mock_email_exists.return_value = False
        result = services.check_availability_service(
            username="newuser",
            email="newuser@gmail.com",
        )
        self.assertTrue(result["username_available"])
        self.assertTrue(result["email_available"])

    @patch("apps.mh_oauth.services.selectors.check_email_exists")
    @patch("apps.mh_oauth.services.selectors.check_username_exists")
    def test_username_exists(self, mock_username_exists, mock_email_exists):
        mock_username_exists.return_value = True
        mock_email_exists.return_value = False

        result = services.check_availability_service(
            username="existinguser",
            email="newuser@gmail.com",
        )

        self.assertFalse(result["username_available"])
        self.assertTrue(result["email_available"])

    @patch("apps.mh_oauth.services.selectors.check_email_exists")
    @patch("apps.mh_oauth.services.selectors.check_username_exists")
    def test_email_exists(self, mock_username_exists, mock_email_exists):
        mock_username_exists.return_value = False
        mock_email_exists.return_value = True

        result = services.check_availability_service(
            username="newuser",
            email="existing@gmail.com",
        )

        self.assertTrue(result["username_available"])
        self.assertFalse(result["email_available"])