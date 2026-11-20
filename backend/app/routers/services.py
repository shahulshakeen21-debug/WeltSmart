from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.service import Service
from app.schemas.service import ServiceResponse, ServiceCreate, ServiceUpdate
from app.services.auth import get_current_admin
import re

router = APIRouter(prefix="/services", tags=["Welding Services"])

def slugify(text: str) -> str:
    text = re.sub(r'[^\w\s-]', '', text.lower()).strip()
    return re.sub(r'[-\s]+', '-', text)

@router.get("", response_model=List[ServiceResponse])
def get_services(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Service).filter(Service.is_active == True)
    if category and category.lower() != "all":
        query = query.filter(Service.category.ilike(f"%{category}%"))
    if search:
        search_fmt = f"%{search}%"
        query = query.filter(
            (Service.name.ilike(search_fmt)) |
            (Service.description.ilike(search_fmt)) |
            (Service.typical_materials.ilike(search_fmt))
        )
    return query.order_by(Service.id.asc()).all()

@router.get("/{id_or_slug}", response_model=ServiceResponse)
def get_service(id_or_slug: str, db: Session = Depends(get_db)):
    if id_or_slug.isdigit():
        srv = db.query(Service).filter(Service.id == int(id_or_slug)).first()
    else:
        srv = db.query(Service).filter(Service.slug == id_or_slug).first()
    if not srv:
        raise HTTPException(status_code=404, detail="Service not found")
    return srv

@router.post("", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def create_service(srv_in: ServiceCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    slug = srv_in.slug or slugify(srv_in.name)
    existing = db.query(Service).filter(Service.slug == slug).first()
    if existing:
        slug = f"{slug}-{db.query(Service).count() + 1}"
    
    srv = Service(**srv_in.dict(exclude={"slug"}), slug=slug)
    db.add(srv)
    db.commit()
    db.refresh(srv)
    return srv

@router.put("/{id}", response_model=ServiceResponse)
def update_service(id: int, srv_in: ServiceUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    srv = db.query(Service).filter(Service.id == id).first()
    if not srv:
        raise HTTPException(status_code=404, detail="Service not found")
    for field, val in srv_in.dict(exclude_unset=True).items():
        setattr(srv, field, val)
    db.commit()
    db.refresh(srv)
    return srv

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    srv = db.query(Service).filter(Service.id == id).first()
    if not srv:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(srv)
    db.commit()
    return None

