from config.config import AppConfig
from requests.exceptions import HTTPError
import requests
# import httpx
from jose import JWTError, jwt
from fastapi import HTTPException, status, Request



class KeycloakManager:
    def __init__(self):
        # Configuration du client KeycloakAdmin
        config = AppConfig()
        self.sso_url = config.SSO_URL
        self.sso_realm = config.SSO_REALM
        self.client_id = config.SSO_CLIENT_ID
        self.sso_admin_username = config.SSO_ADMIN_USERNAME
        self.sso_admin_password = config.SSO_ADMIN_PASSWORD
        self.KEYCLOAK_PUBLIC_KEY_URL = f"{ self.sso_url}auth/realms/{self.sso_realm}/protocol/openid-connect/certs"
        self.ALGORITHM = "RS256"
        self.PUBLIC_KEY = None
        self.tokens = None

    async def verify_token_from_header(self, request: Request):
        # Extraire l'en-tête Authorization de la requête
        authorization: str = request.headers.get("Authorization")
        print(request.headers)
        print(authorization)

        # Vérifier si l'en-tête est fourni
        if authorization is None or not authorization.startswith("Bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="En-tête d'authentification manquant ou malformé.",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    def get_users(self):
        """
        Get a list of users in the realm.
        """
        if not self.tokens:
            self.get_token()
        print("======================")
        print(self.tokens)
        url = f"{self.sso_url}admin/realms/{self.sso_realm}/users"
        headers = {
            'Authorization': f'Bearer {self.tokens["access_token"]}',
            'Refresh-Token': self.tokens["refresh_token"],
            'Content-Type': 'application/json'
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        except Exception as err:
            print(f"Other error occurred: {err}")
        return None
    
    def get_token(self):
        """
        Get an access token using the client credentials or admin credentials.
        """
        url = f"{self.sso_url}realms/{self.sso_realm}/protocol/openid-connect/token"
        data = {
            'client_id': self.client_id,
            'username': self.sso_admin_username,
            'password': self.sso_admin_password,
            'grant_type': 'password'
        }

        try:
            response = requests.post(url, data=data)
            response.raise_for_status()

            resp = response.json()
            self.tokens = {"access_token": resp.get('access_token'), "refresh_token": resp.get('refresh_token')}
            return self.tokens
        except HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        except Exception as err:
            print(f"Other error occurred: {err}")
        return None
    
    def create_user(self, user_data):
        """
        Create a new user in the realm.
        :param user_data: Dictionary containing user information.
        """
        if not self.tokens:
            self.get_token()

        url = f"{self.sso_url}admin/realms/{self.sso_realm}/users"
        headers = {
            'Authorization': f'Bearer {self.tokens}',
            'Refresh-Token': self.tokens["refresh_token"],
            'Content-Type': 'application/json'
        }

        try:
            response = requests.post(url, headers=headers, json=user_data)
            response.raise_for_status()
            return response.status_code, response.json()
        except HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        except Exception as err:
            print(f"Other error occurred: {err}")
        return None

    def delete_user(self, user_id):
        """
        Delete a user by user ID.
        :param user_id: ID of the user to be deleted.
        """
        if not self.tokens:
            self.get_token()

        url = f"{self.sso_url}admin/realms/{self.sso_realm}/users/{user_id}"
        headers = {
            'Authorization': f'Bearer {self.tokens["access_token"]}',
            'Refresh-Token': self.tokens["refresh_token"],
            'Content-Type': 'application/json'
        }

        try:
            response = requests.delete(url, headers=headers)
            response.raise_for_status()
            return response.status_code
        except HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        except Exception as err:
            print(f"Other error occurred: {err}")
        return None