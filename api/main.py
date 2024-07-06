from schemas.user import User
from models.user_model import UserModel
from typing import Annotated
from sqlalchemy.orm import Session
from starlette import status
from config.database_connection import engine, SessionLocal
from models.base_model import Base
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from config.config import AppConfig
from fastapi.exceptions import RequestValidationError


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

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    error_message = {"detail": "Validation Error", "error": exc.errors()}
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder(error_message),
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
    try:
        user = UserModel(**user_data.dict())  # Create a new UserModel instance
        db.add(user)  # Add the user to the session
        db.commit()  # Commit the changes to the database
        return user_data  # Return the created user data
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Price must be non-negative")
