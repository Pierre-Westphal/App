import os
from pydantic_settings import BaseSettings

class WWWConfig(BaseSettings):
    WWW_URL: str = os.getenv("WWW_URL")

class DatabaseConfig(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL")

class SSOConfig(BaseSettings):
    SSO_ADMIN_USERNAME: str = os.getenv("SSO_ADMIN_USERNAME")
    SSO_ADMIN_PASSWORD: str = os.getenv("SSO_ADMIN_PASSWORD")
    SSO_URL: str = os.getenv("SSO_URL")
    SSO_REALM: str = os.getenv("SSO_REALM")
    SSO_CLIENT_ID: str = os.getenv("SSO_CLIENT_ID")

class AppConfig(SSOConfig, WWWConfig, DatabaseConfig):
    pass