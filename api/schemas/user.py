from pydantic import BaseModel
from pydantic.functional_validators import field_validator

class User(BaseModel):
    first_name:str
    last_name:str
    username:str
    email:str
    password:str
 
    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        return v
    
    @field_validator("username")
    def validate_username(cls, v):
        if len(v) < 4:
            raise ValueError("Username must be at least 4 characters long")
        return v
    
    @field_validator("email")
    def validate_email(cls, v):
        if "@" not in v:
            raise ValueError("Invalid email address")
        return v