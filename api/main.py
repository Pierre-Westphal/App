from schemas.user import User
from models.user_model import UserModel
from typing import Annotated, Union
from sqlalchemy.orm import Session
from starlette import status
from config.database_connection import engine, SessionLocal
from models.base_model import Base
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request, Response, Depends
from config.config import AppConfig

app = FastAPI()

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

@app.post("/users", status_code=status.HTTP_201_CREATED)
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
    user = UserModel(**user_data.dict())  # Create a new UserModel instance
    try:
        db.add(user)  # Add the user to the session
        db.commit()  # Commit the changes to the database
        return user_data  # Return the created user data
    except Exception as exc:
        return Response  # Return a Response object in case of an error
