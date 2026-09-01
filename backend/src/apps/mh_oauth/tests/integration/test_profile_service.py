from unittest import TestCase
from unittest.mock import patch, MagicMock

from ... import services


class ProfileServiceTestCase(TestCase):

    @patch("apps.mh_oauth.services.selectors.get_user_by_id")
    def test_profile_service(self, mock_get_user_by_id):
        user=MagicMock()
        user.id=2
        mock_get_user_by_id.return_value = user
        result=services.profile_service(user)
        self.assertEqual(result,user)
        mock_get_user_by_id.assert_called_with(user.id)

    @patch("apps.mh_oauth.services.managers.MyUserManager.update_profile")
    @patch("apps.mh_oauth.services.selectors.get_user_by_id")
    def test_update_profile_service(self, mock_get_user_by_id, mock_update_profile):
        user=MagicMock()
        user.id=2
        data={
            "first_name": "Thị Mai Hồng",
            "last_name": "Lê",
        }

        mock_get_user_by_id.return_value = user
        mock_update_profile.return_value = user
        result=services.update_profile_service(user,data)

        self.assertEqual(result,user)
        mock_get_user_by_id.assert_called_with(user.id)
        mock_update_profile.assert_called_with(user,data)