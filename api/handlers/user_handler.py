from sqlalchemy.orm import Session
from models.user_model import UserModel
from managers.keycloak_manager import KeycloakManager

def create(db: Session, user_data: dict):
        
        user = UserModel(**user_data.dict()) 
        db.add(user) 
        db.commit()
        return user


def get_list(db: Session, q=None):
    if q:
        return db.query(UserModel).filter(UserModel.username.contains(q)).all()
    return db.query(UserModel).all()  