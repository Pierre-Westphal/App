from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import class_mapper

base_model = declarative_base()

class Base(base_model):
    __abstract__ = True
    
    def to_dict(self):
        return {column.key: getattr(self, column.key) for column in class_mapper(self.__class__).columns}