from dataclasses import Field
import datetime
from re import T
from typing import  Optional
from pydantic import EmailStr
from redis_om import (
    EmbeddedJsonModel,
    JsonModel,
    Field
)

class Address(EmbeddedJsonModel):
    address_line_1: str
    address_line_2: Optional[str]
    city: str = Field(index=True)
    state: str = Field(index=True)
    country: str
    postal_code: str = Field(index=True)

class User(JsonModel):
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)
    age: int = Field(index=True)
    email: EmailStr = Field(index=True)
    last_login: datetime.date
    address: Address
    bio: Optional[str] = Field(index=True, full_text_search=True, default="")
