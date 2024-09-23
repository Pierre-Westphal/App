from sqlalchemy.orm import Session
from models.user_model import UserModel


def get_list(db: Session):
    return db.query(UserModel).all()  