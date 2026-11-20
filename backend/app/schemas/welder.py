from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import datetime

class WelderProfileBase(BaseModel):
    machine_name: str = "IGBT Inverter Arc/MIG 200A"
    machine_purchase_cost: float = 24000.0
    machine_lifespan_hours: float = 4000.0
    maintenance_cost_annual: float = 3000.0
    default_power_rating_kw: float = 4.5
    electricity_rate_kwh: float = 9.5
    hourly_labour_rate: float = 300.0
    helper_labour_rate: float = 150.0
    transport_cost_per_km: float = 16.0
    target_profit_margin_pct: float = 22.0
    workshop_address: Optional[str] = None
    city: str = "Mumbai"
    experience_years: int = 5
    certifications: Optional[str] = None

class WelderProfileUpdate(BaseModel):
    machine_name: Optional[str] = None
    machine_purchase_cost: Optional[float] = None
    machine_lifespan_hours: Optional[float] = None
    maintenance_cost_annual: Optional[float] = None
    default_power_rating_kw: Optional[float] = None
    electricity_rate_kwh: Optional[float] = None
    hourly_labour_rate: Optional[float] = None
    helper_labour_rate: Optional[float] = None
    transport_cost_per_km: Optional[float] = None
    target_profit_margin_pct: Optional[float] = None
    workshop_address: Optional[str] = None
    city: Optional[str] = None
    experience_years: Optional[int] = None
    certifications: Optional[str] = None

class WelderProfileResponse(WelderProfileBase):
    id: int
    user_id: int
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

class WelderDashboardMetrics(BaseModel):
    total_jobs: int
    total_revenue: float
    total_material_cost: float
    total_consumable_cost: float
    total_electricity_cost: float
    total_labour_cost: float
    estimated_profit: float
    average_profit_margin_pct: float
    
    monthly_financials: List[Dict[str, Any]]
    job_type_distribution: List[Dict[str, Any]]
    recent_quotes: List[Dict[str, Any]]

