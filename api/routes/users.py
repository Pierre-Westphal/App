from fastapi import HTTPException, Query, APIRouter, Request
from starlette import status
from typing import List, Optional

from config.database_connection import get_db, db_dependency

from helpers import keycloak_helper
from schemas.user import User
from managers.keycloak_manager import KeycloakManager

from handlers import user_handler

router = APIRouter()

get_db()

@router.post("/user", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, user_data: User, request: Request):

    user = KeycloakManager().get_users(params={"username": user_data.username})
    print(user)
    if len(user) > 0:
        raise HTTPException(status_code=400, detail="User already exists")
    
    try:
        _, keycloak_user = KeycloakManager().create_user(keycloak_helper.create_user_dict_for_keycloak(user_data))
    except Exception as exc:
        raise HTTPException(status_code=400, detail="An error occurred while creating the user")

    try:
        user_data.sso_user_id = keycloak_user["id"]
        test = user_handler.create(db, user_data).to_dict()
        print(test)
        return test 
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
