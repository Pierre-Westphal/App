from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.database_connection import get_db
from config.config import AppConfig

from managers.keycloak_manager import KeycloakManager
from middlewares.auth_middleware import AuthMiddleware
from middlewares.camel_to_snake_middleware import CamelToSnakeMiddleware
from middlewares.snake_to_camel_middleware import SnakeToCamelMiddleware
from middlewares.audit_middleware import AuditMiddleware

from routes import users_router

app = FastAPI()

app.add_middleware(AuthMiddleware, keycloak_manager=KeycloakManager())
app.add_middleware(CamelToSnakeMiddleware)
app.add_middleware(SnakeToCamelMiddleware)
app.add_middleware(AuditMiddleware)

app_settings = AppConfig()

get_db()

origins = [app_settings.WWW_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)

@app.get("/")
def root():
    return {"message": "API alive"}

@app.get("/health")
def health():
    return {"message": "API Health"}