from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from config.database_connection import get_db
from config.config import AppConfig

from managers.keycloak_manager import KeycloakManager
from middlewares.auth_middleware import AuthMiddleware

from routes import users_router

app = FastAPI()

app.add_middleware(AuthMiddleware, keycloak_manager=KeycloakManager())

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

@app.post("/login")
async def login(request: Request):
    
    return await request.json()