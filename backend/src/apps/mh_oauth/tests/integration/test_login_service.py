from unittest import TestCase
from unittest.mock import patch, MagicMock

from rest_framework.exceptions import AuthenticationFailed, PermissionDenied

from ... import services

class LoginServiceTestCase(TestCase):

    @patch("apps.mh_oauth.services.RefreshToken.for_user")
    @patch("apps.mh_oauth.services.authenticate")
    def test_login_service_success(self, mock_authenticate, mock_for_user):
        user=MagicMock()
        user.role="user"
        mock_authenticate.return_value = user

        mock_refresh = MagicMock()
        mock_refresh.access_token = "access-token"
        mock_refresh.__str__.return_value = "refresh-token"
        mock_for_user.return_value = mock_refresh

        data={
            "username": "testuser",
            "password":"Abcd@1234"
        }
        result=services.login_service(data)

        mock_authenticate.assert_called_once_with(
            username="testuser",
            password="Abcd@1234"
        )
        mock_for_user.assert_called_once_with(user)

        self.assertEqual(result["access_token"], "access-token")
        self.assertEqual(result["refresh_token"], "refresh-token")
        self.assertEqual(result["expires"], 3600)
        self.assertEqual(result["token_type"], "Bearer")

    @patch("apps.mh_oauth.services.authenticate")
    def test_login_service_fail(self, mock_authenticate):
        mock_authenticate.return_value = None
        data = {
            "username": "testuser",
            "password": "Abcd@1234"
        }

        with self.assertRaises(AuthenticationFailed) as context:
            services.login_service(data)
        self.assertEqual(str(context.exception), "Username hoặc password không đúng.")
        self.assertEqual(context.exception.status_code, 401)
        mock_authenticate.assert_called_once_with(username="testuser", password="Abcd@1234")

    @patch("apps.mh_oauth.services.authenticate")
    def test_login_service_role_not_allowed(self, mock_authenticate):
        user=MagicMock()
        user.role="admin"
        mock_authenticate.return_value = user
        data = {
            "username": "admin",
            "password": "123"
        }

        with self.assertRaises(PermissionDenied) as context:
            services.login_service(data)
        self.assertEqual(str(context.exception), "Tài khoản không được phép đăng nhập.")
        self.assertEqual(context.exception.status_code, 403)
        mock_authenticate.assert_called_once_with(username="admin", password="123")


