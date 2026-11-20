from pydantic import BaseModel
from typing import Optional
import datetime

class ConsumableBase(BaseModel):
    name: str
    category: str = "Electrode"
    unit: str = "piece"
    unit_price: float
    description: Optional[str] = None
    burn_rate_or_yield: Optional[str] = None
    is_active: bool = True

class ConsumableCreate(ConsumableBase):
    pass

class ConsumableUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    unit: Optional[str] = None
    unit_price: Optional[float] = None
    description: Optional[str] = None
    burn_rate_or_yield: Optional[str] = None
    is_active: Optional[bool] = None

class ConsumableResponse(ConsumableBase):
    id: int
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

