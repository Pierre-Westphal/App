from sqlalchemy.orm import Session
from models.user_model import UserModel
from managers.keycloak_manager import KeycloakManager

def create(db: Session, user_data: dict):
        user = UserModel(**user_data.dict(exclude={"password", "user_id"})) 
        db.add(user) 
        db.commit()
        return user


def get_list(db: Session, q=None):
    if q:
        return db.query(UserModel).filter(UserModel.username.contains(q)).all()
    return db.query(UserModel).all()

def get(db: Session, user_id=None):
    return db.query(UserModel).filter(UserModel.user_id == user_id).one_or_none()

def patch(db: Session, user_data: dict):
    user = db.query(UserModel).filter(UserModel.user_id == user_data.user_id).one_or_none()
    if user:
        for key, value in user_data.dict().items():
            setattr(user, key, value)
        db.commit()
        return user

def get_by_sso_user_id(db: Session, sso_user_id=None):
    return db.query(UserModel).filter(UserModel.sso_user_id == sso_user_id).one_or_none()
