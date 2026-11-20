from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
import datetime

class QuoteCreate(BaseModel):
    customer_name: str
    customer_email: Optional[EmailStr] = None
    customer_phone: Optional[str] = None
    location: Optional[str] = "Local Workshop"
    urgency: Optional[str] = "Standard"
    
    service_name: str = "Custom Welding Work"
    welding_type: str = "Arc welding"
    material_type: str = "Mild Steel"
    material_quantity_kg: float = 10.0
    number_of_joints: int = 8
    duration_hours: float = 3.0
    labour_hours: float = 3.0
    transport_km: float = 5.0
    
    notes: Optional[str] = None

class QuoteUpdate(BaseModel):
    customer_name: Optional[str] = None
    customer_email: Optional[EmailStr] = None
    customer_phone: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class QuoteResponse(BaseModel):
    id: int
    quote_number: str
    user_id: Optional[int] = None
    customer_name: str
    customer_email: Optional[str] = None
    customer_phone: Optional[str] = None
    location: str
    urgency: str
    
    service_name: str
    welding_type: str
    material_type: str
    material_quantity_kg: float
    number_of_joints: int
    duration_hours: float
    labour_hours: float
    transport_km: float
    
    material_cost: float
    electrode_wire_cost: float
    electricity_cost: float
    gas_cost: float
    grinding_cutting_cost: float
    machine_usage_cost: float
    labour_cost: float
    transport_cost: float
    other_expenses_cost: float
    
    total_operating_cost: float
    profit_margin_amount: float
    recommended_price: float
    
    breakdown_json: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None
    status: str
    created_at: datetime.datetime
    valid_until: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True

