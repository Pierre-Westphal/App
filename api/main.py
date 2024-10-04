from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI, HTTPException, Request, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from starlette import status
from typing import Annotated, List, Optional

from config.database_connection import engine, SessionLocal
from config.config import AppConfig

from models.base_model import Base
from models.user_model import UserModel
from schemas.user import User
from managers.keycloak_manager import KeycloakManager
from middlewares.auth_middleware import AuthMiddleware

from handlers import user_handler


app = FastAPI()

keycloak_manager = KeycloakManager()

app.add_middleware(AuthMiddleware, keycloak_manager=keycloak_manager)

Base.metadata.create_all(bind=engine)

app_settings = AppConfig()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

origins = [app_settings.WWW_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API alive"}

@app.get("/health")
def health():
    return {"message": "API Health"}

@app.post("/login")
async def login(request: Request):
    
    return await request.json()

@app.post("/user", status_code=status.HTTP_201_CREATED)
async def create_user(
    db: db_dependency,  # Dependency injection for the database session
    user_data: User  # User data from the request body
):
    """
    Create a new user.

    Args:
        db (Session): The database session.
        user_data (User): The user data from the request body.

    Returns:
        Union[User, Response]: The created user data if successful, otherwise a Response object.
    """
    try:
        user = UserModel(**user_data.dict())  # Create a new UserModel instance
        db.add(user)  # Add the user to the session
        db.commit()  # Commit the changes to the database
        return user_data  # Return the created user data
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Price must be non-negative")
    
@app.get("/users", response_model=List[User])
async def get_users(db: db_dependency, q: Optional[str] = Query(None)):
    """
    Get all users.

    Args:
        db (Session): The database session.

    Returns:
        List[User]: A list of all user data.
    """

    users = user_handler.get_list(db, q=q)
    return users
