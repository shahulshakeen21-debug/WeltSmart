from pydantic import BaseModel
from typing import Optional
import datetime

class ToolBase(BaseModel):
    name: str
    category: str = "Equipment"
    image_url: Optional[str] = None
    purpose: str
    typical_price_min: float
    typical_price_max: float
    expected_lifespan: str = "3-5 Years (4000 hours)"
    maintenance_cost_annual: float = 2500.0
    approx_cost_per_job: float = 65.0
    why_it_matters: str
    depreciation_formula: Optional[str] = None
    is_verified: bool = True

class ToolCreate(ToolBase):
    slug: Optional[str] = None

class ToolUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    purpose: Optional[str] = None
    typical_price_min: Optional[float] = None
    typical_price_max: Optional[float] = None
    expected_lifespan: Optional[str] = None
    maintenance_cost_annual: Optional[float] = None
    approx_cost_per_job: Optional[float] = None
    why_it_matters: Optional[str] = None
    is_verified: Optional[bool] = None

class ToolResponse(ToolBase):
    id: int
    slug: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

