from fastapi import HTTPException, Query, APIRouter, Request
from starlette import status
from typing import List, Optional

from config.database_connection import get_db, db_dependency

from models.user_model import UserModel
from schemas.user import User
from managers.keycloak_manager import KeycloakManager

from handlers import user_handler

router = APIRouter()

get_db()

@router.post("/user", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, user_data: User, request: Request):
    user = KeycloakManager().get_users(params={"username": user_data.username})
    print(user)
    try:
        return user_handler.create(db, user_data) 
    except Exception as exc:
        raise HTTPException(status_code=400, detail="An error occurred while creating the user")
    
@router.get("/users", response_model=List[User])
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
