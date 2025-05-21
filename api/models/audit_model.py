from sqlalchemy import Column, Integer, String, Enum as SQLAlchemyEnum
from models.base_model import Base
from enums.http_method_enum import HttpMethodEnum

class AuditModel(Base):
    __tablename__ = 'audits'

    audit_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    path = Column(String, nullable=False)
    method = Column(SQLAlchemyEnum(HttpMethodEnum), nullable=False, default=HttpMethodEnum.GET.value)
    timestamp = Column(String, nullable=False)
    details = Column(String, nullable=True)