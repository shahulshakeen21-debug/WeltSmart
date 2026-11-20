from pydantic import BaseModel
from typing import Optional, Dict, Any
import datetime

class ServiceBase(BaseModel):
    name: str
    category: str = "Fabrication"
    description: str
    min_price: float
    max_price: float
    typical_duration_hours: float = 4.0
    complexity: str = "Medium"
    typical_materials: Optional[str] = None
    typical_tools: Optional[str] = None
    recommended_welding_type: Optional[str] = "Arc welding"
    preset_params: Optional[Dict[str, Any]] = None
    image_url: Optional[str] = None
    is_active: bool = True

class ServiceCreate(ServiceBase):
    slug: Optional[str] = None

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    typical_duration_hours: Optional[float] = None
    complexity: Optional[str] = None
    typical_materials: Optional[str] = None
    typical_tools: Optional[str] = None
    recommended_welding_type: Optional[str] = None
    preset_params: Optional[Dict[str, Any]] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None

class ServiceResponse(ServiceBase):
    id: int
    slug: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

