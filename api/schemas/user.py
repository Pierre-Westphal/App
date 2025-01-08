from pydantic import BaseModel, root_validator
from pydantic.functional_validators import field_validator
from typing import Optional


class User(BaseModel):
    user_id : Optional[int] = 0
    first_name: str
    last_name: str
    username: str
    email: str
    password: Optional[str] = None
    sso_user_id: Optional[str] = None
    language: str
 
    # @root_validator(pre=True)
    # def validate_password(cls, values):
    #     password = values.get('password')
    #     if password and len(password) < 8:
    #         raise ValueError("Password must be at least 8 characters long")
    #     return values
    
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