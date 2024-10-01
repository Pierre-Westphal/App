from sqlalchemy.orm import Session
from models.user_model import UserModel


def get_list(db: Session, q=None):
    if q:
        return db.query(UserModel).filter(UserModel.username.contains(q)).all()
    return db.query(UserModel).all()  