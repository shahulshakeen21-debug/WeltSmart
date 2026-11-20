from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.database import get_db
from app.models.setting import Setting
from app.models.user import User
from app.models.tool import Tool
from app.models.consumable import Consumable
from app.models.service import Service
from app.models.quote import Quote
from app.schemas.setting import SettingResponse, SettingUpdate
from app.services.auth import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin Management"])

@router.get("/settings", response_model=List[SettingResponse])
def get_all_settings(db: Session = Depends(get_db)):
    return db.query(Setting).order_by(Setting.category.asc(), Setting.key.asc()).all()

@router.put("/settings/{key}", response_model=SettingResponse)
def update_setting(key: str, setting_in: SettingUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    setting = db.query(Setting).filter(Setting.key == key).first()
    if not setting:
        raise HTTPException(status_code=404, detail="Setting key not found")
    setting.value = setting_in.value
    if setting_in.description:
        setting.description = setting_in.description
    db.commit()
    db.refresh(setting)
    return setting

@router.get("/stats")
def get_admin_stats(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    total_users = db.query(User).count()
    welders_count = db.query(User).filter(User.role == "welder").count()
    customers_count = db.query(User).filter(User.role == "customer").count()
    tools_count = db.query(Tool).count()
    consumables_count = db.query(Consumable).count()
    services_count = db.query(Service).count()
    quotes_count = db.query(Quote).count()
    total_quote_value = sum(q.recommended_price for q in db.query(Quote).all())

    return {
        "total_users": total_users,
        "welders_count": welders_count,
        "customers_count": customers_count,
        "tools_count": tools_count,
        "consumables_count": consumables_count,
        "services_count": services_count,
        "quotes_count": quotes_count,
        "total_quote_value": round(total_quote_value, 2)
    }

