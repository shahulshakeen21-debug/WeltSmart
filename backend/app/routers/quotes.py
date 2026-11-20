import datetime
import random
import jwt
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.quote import Quote
from app.models.user import User
from app.schemas.quote import QuoteCreate, QuoteUpdate, QuoteResponse
from app.services.cost_engine import CostEngine
from app.services.auth import oauth2_scheme
from app.config import settings

router = APIRouter(prefix="/quotes", tags=["Quotations"])

def generate_quote_number(db: Session) -> str:
    year = datetime.datetime.utcnow().year
    for _ in range(10):
        code = random.randint(1000, 9999)
        num = f"WC-{year}-{code}"
        if not db.query(Quote).filter(Quote.quote_number == num).first():
            return num
    return f"WC-{year}-{random.randint(10000, 99999)}"

def get_optional_user(token: Optional[str] = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Optional[User]:
    if not token:
        return None
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email:
            return db.query(User).filter(User.email == email).first()
    except Exception:
        pass
    return None

@router.post("", response_model=QuoteResponse, status_code=status.HTTP_201_CREATED)
def create_quote(
    quote_in: QuoteCreate,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    # Run the cost calculation engine
    cost_calc = CostEngine.calculate_welding_cost(
        welding_type=quote_in.welding_type,
        duration_hours=quote_in.duration_hours,
        number_of_joints=quote_in.number_of_joints,
        material_type=quote_in.material_type,
        material_quantity_kg=quote_in.material_quantity_kg,
        electrode_wire_qty=max(quote_in.number_of_joints * 1.2, 2.0),
        transport_km=quote_in.transport_km,
        labour_hours=quote_in.labour_hours
    )

    quote_num = generate_quote_number(db)
    valid_until = datetime.datetime.utcnow() + datetime.timedelta(days=15)

    quote = Quote(
        quote_number=quote_num,
        user_id=current_user.id if current_user else None,
        customer_name=quote_in.customer_name,
        customer_email=quote_in.customer_email,
        customer_phone=quote_in.customer_phone,
        location=quote_in.location or "Local Workshop",
        urgency=quote_in.urgency or "Standard",
        service_name=quote_in.service_name,
        welding_type=quote_in.welding_type,
        material_type=quote_in.material_type,
        material_quantity_kg=quote_in.material_quantity_kg,
        number_of_joints=quote_in.number_of_joints,
        duration_hours=quote_in.duration_hours,
        labour_hours=quote_in.labour_hours,
        transport_km=quote_in.transport_km,
        material_cost=cost_calc["material_cost"],
        electrode_wire_cost=cost_calc["electrode_wire_cost"],
        electricity_cost=cost_calc["electricity_cost"],
        gas_cost=cost_calc["gas_cost"],
        grinding_cutting_cost=cost_calc["grinding_cutting_cost"],
        machine_usage_cost=cost_calc["machine_usage_cost"],
        labour_cost=cost_calc["labour_cost"],
        transport_cost=cost_calc["transport_cost"],
        other_expenses_cost=cost_calc["other_expenses_cost"],
        total_operating_cost=cost_calc["total_operating_cost"],
        profit_margin_amount=cost_calc["profit_margin_amount"],
        recommended_price=cost_calc["recommended_price"],
        breakdown_json=cost_calc,
        notes=quote_in.notes,
        status="Generated",
        valid_until=valid_until
    )
    db.add(quote)
    db.commit()
    db.refresh(quote)
    return quote

@router.get("", response_model=List[QuoteResponse])
def get_quotes(
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    if not current_user:
        # For public/guest view, return latest public quotes sample
        return db.query(Quote).order_by(Quote.created_at.desc()).limit(10).all()
    
    if current_user.role == "admin":
        return db.query(Quote).order_by(Quote.created_at.desc()).all()
    
    # Welder or customer's own quotes
    return db.query(Quote).filter(Quote.user_id == current_user.id).order_by(Quote.created_at.desc()).all()

@router.get("/{quote_number}", response_model=QuoteResponse)
def get_quote_by_number(quote_number: str, db: Session = Depends(get_db)):
    quote = db.query(Quote).filter(Quote.quote_number == quote_number).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quotation not found")
    return quote

@router.put("/{id}", response_model=QuoteResponse)
def update_quote(id: int, quote_in: QuoteUpdate, db: Session = Depends(get_db)):
    quote = db.query(Quote).filter(Quote.id == id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quotation not found")
    for field, val in quote_in.dict(exclude_unset=True).items():
        setattr(quote, field, val)
    db.commit()
    db.refresh(quote)
    return quote

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_quote(id: int, db: Session = Depends(get_db)):
    quote = db.query(Quote).filter(Quote.id == id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quotation not found")
    db.delete(quote)
    db.commit()
    return None

