from schemas.user import User
from config.models import UserModel
from typing import Annotated
from sqlalchemy.orm import Session
from starlette import status
from congig.database_connection import engine, SessionLocal
import models
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request, Response

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


origins = ["http://localhost:3000"]

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
async def create_user(db: db_dependency, user_data: User):
    user = UserModel(**user_data.dict())
    try:
        return user_data
    except Exception as exc:
        return Response