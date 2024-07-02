from sqlalchemy import Column, Integer, String
from models.base_model import Base

class UserModel(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    sso_user_id = Column(String)