from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List

class CalculationInput(BaseModel):
    welding_type: str = Field(default="Arc welding", description="Arc welding, MIG welding, TIG welding, Gas welding")
    duration_hours: float = Field(default=2.0, ge=0.1, le=100.0)
    number_of_joints: int = Field(default=6, ge=1, le=500)
    material_type: str = Field(default="Mild Steel")
    material_quantity_kg: float = Field(default=5.0, ge=0.0)
    electrode_wire_qty: float = Field(default=6.0, ge=0.0)
    gas_usage_litres: float = Field(default=0.0, ge=0.0)
    electricity_kwh_override: Optional[float] = None
    cutting_wheels_used: float = Field(default=1.0, ge=0.0)
    grinding_wheels_used: float = Field(default=1.0, ge=0.0)
    transport_km: float = Field(default=5.0, ge=0.0)
    labour_hours: float = Field(default=2.0, ge=0.1)
    
    # Optional Welder custom overrides
    labour_rate_per_hour: Optional[float] = None
    electricity_rate_per_kwh: Optional[float] = None
    machine_purchase_cost: Optional[float] = None
    machine_lifespan_hours: Optional[float] = None
    transport_rate_per_km: Optional[float] = None
    profit_margin_percent: Optional[float] = None

class CostBreakdownResponse(BaseModel):
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
    breakdown_percentages: Dict[str, float]
    explanations: Dict[str, str]
    disclaimer: str

class Why500Item(BaseModel):
    item: str
    amount: float
    percentage: float
    color: str
    icon: str
    reality: str

class Why500Response(BaseModel):
    customer_price: float
    items: List[Why500Item]
    total_operating_cost: float
    net_profit: float
    takeaway_message: str

