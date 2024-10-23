from enum import Enum

class ExtendedEnum(Enum):    
    @classmethod
    def list(cls):
        return list(map(lambda item: item.value, cls))