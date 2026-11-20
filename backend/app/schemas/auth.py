from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "customer"  # customer, welder, admin
    phone: Optional[str] = None
    workshop_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    phone: Optional[str] = None
    workshop_name: Optional[str] = None
    is_active: bool
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    email: Optional[str] = None

