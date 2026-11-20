from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.setting import Setting
from app.models.welder_profile import WelderProfile
from app.models.user import User
from app.schemas.calculator import CalculationInput, CostBreakdownResponse, Why500Response
from app.services.cost_engine import CostEngine
from app.services.auth import oauth2_scheme
import jwt
from app.config import settings

router = APIRouter(prefix="/calculator", tags=["Cost Calculator"])

@router.post("/calculate", response_model=CostBreakdownResponse)
def calculate_cost(input_data: CalculationInput, db: Session = Depends(get_db)):
    # Retrieve default rates from settings table if available
    db_electricity = db.query(Setting).filter(Setting.key == "default_electricity_rate").first()
    db_labour = db.query(Setting).filter(Setting.key == "suggested_labour_rate").first()
    db_transport = db.query(Setting).filter(Setting.key == "transport_rate_per_km").first()
    db_margin = db.query(Setting).filter(Setting.key == "default_profit_margin").first()

    default_elec = float(db_electricity.value) if db_electricity else 9.5
    default_lab = float(db_labour.value) if db_labour else 250.0
    default_trans = float(db_transport.value) if db_transport else 16.0
    default_prof = float(db_margin.value) if db_margin else 22.0

    result = CostEngine.calculate_welding_cost(
        welding_type=input_data.welding_type,
        duration_hours=input_data.duration_hours,
        number_of_joints=input_data.number_of_joints,
        material_type=input_data.material_type,
        material_quantity_kg=input_data.material_quantity_kg,
        electrode_wire_qty=input_data.electrode_wire_qty,
        gas_usage_litres=input_data.gas_usage_litres,
        electricity_kwh_override=input_data.electricity_kwh_override,
        cutting_wheels_used=input_data.cutting_wheels_used,
        grinding_wheels_used=input_data.grinding_wheels_used,
        transport_km=input_data.transport_km,
        labour_hours=input_data.labour_hours,
        labour_rate_per_hour=input_data.labour_rate_per_hour or default_lab,
        electricity_rate_per_kwh=input_data.electricity_rate_per_kwh or default_elec,
        machine_purchase_cost=input_data.machine_purchase_cost or 25000.0,
        machine_lifespan_hours=input_data.machine_lifespan_hours or 4000.0,
        transport_rate_per_km=input_data.transport_rate_per_km or default_trans,
        profit_margin_percent=input_data.profit_margin_percent or default_prof,
    )
    return result

@router.get("/why-500", response_model=Why500Response)
def get_why_500_breakdown(price: float = Query(500.0, ge=50.0, le=100000.0, description="Customer price to analyze")):
    """
    Explains the exact cost decomposition for ₹500 (or any chosen price).
    """
    return CostEngine.get_why_500_breakdown(price)

@router.get("/presets")
def get_presets():
    return [
        {
            "id": "small-repair",
            "title": "Small Door Hinge / Silencer Patch",
            "price": 500,
            "params": {
                "welding_type": "Arc welding",
                "duration_hours": 1.0,
                "number_of_joints": 2,
                "material_type": "Mild Steel",
                "material_quantity_kg": 0.5,
                "electrode_wire_qty": 3,
                "cutting_wheels_used": 1,
                "grinding_wheels_used": 1,
                "transport_km": 4,
                "labour_hours": 1.0
            }
        },
        {
            "id": "gate-repair",
            "title": "Sliding Gate Wheel & Latch Fix",
            "price": 1800,
            "params": {
                "welding_type": "Arc welding",
                "duration_hours": 3.0,
                "number_of_joints": 8,
                "material_type": "Mild Steel",
                "material_quantity_kg": 4.0,
                "electrode_wire_qty": 10,
                "cutting_wheels_used": 1,
                "grinding_wheels_used": 1,
                "transport_km": 8,
                "labour_hours": 3.0
            }
        },
        {
            "id": "window-grill",
            "title": "Complete Window Safety Grill",
            "price": 4500,
            "params": {
                "welding_type": "Arc welding",
                "duration_hours": 4.5,
                "number_of_joints": 28,
                "material_type": "Mild Steel",
                "material_quantity_kg": 24.0,
                "electrode_wire_qty": 25,
                "cutting_wheels_used": 2,
                "grinding_wheels_used": 2,
                "transport_km": 10,
                "labour_hours": 4.5
            }
        },
        {
            "id": "ss-railing",
            "title": "Stainless Steel Balcony Railing",
            "price": 9500,
            "params": {
                "welding_type": "TIG welding",
                "duration_hours": 6.0,
                "number_of_joints": 16,
                "material_type": "Stainless Steel (SS 304)",
                "material_quantity_kg": 15.0,
                "electrode_wire_qty": 5,
                "gas_usage_litres": 80.0,
                "cutting_wheels_used": 2,
                "grinding_wheels_used": 3,
                "transport_km": 12,
                "labour_hours": 6.0
            }
        }
    ]

