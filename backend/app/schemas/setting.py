from pydantic import BaseModel
from typing import Optional
import datetime

class SettingBase(BaseModel):
    key: str
    value: str
    data_type: str = "float"
    category: str = "Rates"
    description: Optional[str] = None

class SettingUpdate(BaseModel):
    value: str
    description: Optional[str] = None

class SettingResponse(SettingBase):
    id: int
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

