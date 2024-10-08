from config.config import AppConfig
from requests.exceptions import HTTPError
import requests
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

    async def verify_token_from_header(self, request: Request):
        authorization: str = request.headers.get("Authorization")
        if authorization is None or not authorization.startswith("Bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="En-tête d'authentification manquant ou malformé.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
    def is_token_valid(self, access_token):
        
        headers = {
            "Authorization": access_token,
        }
        print(headers)
        url = f'{self.sso_url}realms/{self.sso_realm}/protocol/openid-connect/userinfo'
        
        response = requests.get(url, headers=headers)

        return response.status_code == 200

    def get_users(self, params=None, headers=None):
        """
        Get a list of users in the realm.
        """
        # if not headers:
        tokens = self.get_token()
        headers = {
            'Authorization': f'Bearer {tokens["access_token"]}',
            'Refresh-Token': tokens["refresh_token"],
        }

        url = f"{self.sso_url}admin/realms/{self.sso_realm}/users"

        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            return response.json()
        except HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        except Exception as err:
            print(f"Other error occurred: {err}")
        return None
    
    def get_token(self, headers=None):
        """
        Get an access token using the client credentials or admin credentials.
        """
        response = None

        try:
            # if self.tokens:
            #     response = self.is_token_valid(self.tokens['access_token'])
            # if not self.tokens or response.status_code > 400:
                
            url = f"{self.sso_url}realms/{self.sso_realm}/protocol/openid-connect/token"
            data = {
                'client_id': self.client_id,
                'username': self.sso_admin_username,
                'password': self.sso_admin_password,
                'grant_type': 'password'
            }
            
            response = requests.post(url, data=data).json()
            return  {"access_token": response.get('access_token'), "refresh_token": response.get('refresh_token')}
        except HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        
        except Exception as err:
            print(f"Other error occurred: {err}")
    
    def create_user(self, user_data, headers=None):
        """
        Create a new user in the realm.
        :param user_data: Dictionary containing user information.
        """
        if not headers:
            headers = self.get_token()

        url = f"{self.sso_url}admin/realms/{self.sso_realm}/users"
        headers = {
            'Authorization': f'Bearer {headers["access_token"]}',
            'Refresh-Token': headers["refresh_token"],
            'Content-Type': 'application/json'
        }

        try:
            response = requests.post(url, headers=headers, json=user_data)
            response.raise_for_status()

            if response.status_code >= 400:
                raise HTTPException(status_code=response.status_code, detail=response.json())

            return response.status_code, self.get_users(params={"username": user_data["username"]}, headers=headers)[0]
        except HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        except Exception as err:
            print(f"Other error occurred: {err}")
        return None

    def delete_user(self, user_id, headers=None):
        """
        Delete a user by user ID.
        :param user_id: ID of the user to be deleted.
        """

        headers = self.get_token()

        url = f"{self.sso_url}admin/realms/{self.sso_realm}/users/{user_id}"
        headers = {
            'Authorization': f'Bearer {headers["access_token"]}',
            'Refresh-Token': headers["refresh_token"],
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