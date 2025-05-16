from sqlalchemy import Column, Integer, String, Enum as SQLAlchemyEnum
from models.base_model import Base
from enums.languages_type import LanguagesType

class UserModel(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False)
    sso_user_id = Column(String, nullable=True)
    language = Column(SQLAlchemyEnum(LanguagesType), nullable=False, default=LanguagesType.FR.value)