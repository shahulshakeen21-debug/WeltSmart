from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.consumable import Consumable
from app.schemas.consumable import ConsumableResponse, ConsumableCreate, ConsumableUpdate
from app.services.auth import get_current_admin

router = APIRouter(prefix="/consumables", tags=["Consumables"])

@router.get("", response_model=List[ConsumableResponse])
def get_consumables(
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Consumable).filter(Consumable.is_active == True)
    if category and category.lower() != "all":
        query = query.filter(Consumable.category.ilike(f"%{category}%"))
    return query.order_by(Consumable.category.asc(), Consumable.name.asc()).all()

@router.post("", response_model=ConsumableResponse, status_code=status.HTTP_201_CREATED)
def create_consumable(item_in: ConsumableCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    item = Consumable(**item_in.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{id}", response_model=ConsumableResponse)
def update_consumable(id: int, item_in: ConsumableUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    item = db.query(Consumable).filter(Consumable.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Consumable not found")
    
    for field, val in item_in.dict(exclude_unset=True).items():
        setattr(item, field, val)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_consumable(id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    item = db.query(Consumable).filter(Consumable.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Consumable not found")
    db.delete(item)
    db.commit()
    return None

