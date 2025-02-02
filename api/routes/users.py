from fastapi import HTTPException, Query, APIRouter, Request
from starlette import status
from typing import List, Optional

from config.database_connection import get_db, db_dependency

from helpers import keycloak_helper, sso_helper
from schemas.user import User
from managers.keycloak_manager import KeycloakManager
from handlers import user_handler

router = APIRouter()

get_db()

@router.post("/user", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, user_data: User):

    user = KeycloakManager().get_users(params={"username": user_data.username})

    if user and len(user) > 0:
        raise HTTPException(status_code=400, detail="User already exists")
    
    try:
        _, keycloak_user = KeycloakManager().create_user(keycloak_helper.create_user_dict_for_keycloak(user_data))
    except Exception as exc:
        raise HTTPException(status_code=400, detail="An error occurred while creating the user")

    try:
        user_data.sso_user_id = keycloak_user["id"]
        return user_handler.create(db, user_data).to_dict()
    except Exception as exc:
        raise HTTPException(status_code=400, detail="An error occurred while creating the user")
    
@router.patch("/user", status_code=status.HTTP_200_OK)
async def update_user(db: db_dependency, user_data: User):
    user = user_handler.get(db, user_data.user_id)
    if not user:
        raise HTTPException(status_code=400, detail="User does not exist")
    try:
        print(sso_helper.updated_fields(user.to_dict(), user_data.dict()))
        KeycloakManager().update_user(user.sso_user_id, keycloak_helper.create_user_dict_for_keycloak(user_data))
    except Exception as exc:
        print(exc)
        raise HTTPException(status_code=400, detail="An error occurred while updating the user")

    try:
        user_data.sso_user_id = user.sso_user_id
        # return user_handler.patch(db, user_data).to_dict()
        return user.to_dict()
    except Exception as exc:
        raise HTTPException(status_code=400, detail="An error occurred while updating the user")
    

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

@router.get("/user-sso-user-id/{sso_user_id}", response_model=User)
async def get_user(db: db_dependency, sso_user_id: Optional[str]):
    return user_handler.get_by_sso_user_id(db, sso_user_id)