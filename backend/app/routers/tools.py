from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.tool import Tool
from app.schemas.tool import ToolResponse, ToolCreate, ToolUpdate
from app.services.auth import get_current_admin
import re

router = APIRouter(prefix="/tools", tags=["Welding Tools & Equipment"])

def slugify(text: str) -> str:
    text = re.sub(r'[^\w\s-]', '', text.lower()).strip()
    return re.sub(r'[-\s]+', '-', text)

@router.get("", response_model=List[ToolResponse])
def get_tools(
    search: Optional[str] = Query(None, description="Search by name, purpose or explanation"),
    category: Optional[str] = Query(None, description="Filter by category"),
    db: Session = Depends(get_db)
):
    query = db.query(Tool)
    if category and category.lower() != "all":
        query = query.filter(Tool.category.ilike(f"%{category}%"))
    if search:
        search_fmt = f"%{search}%"
        query = query.filter(
            (Tool.name.ilike(search_fmt)) |
            (Tool.purpose.ilike(search_fmt)) |
            (Tool.why_it_matters.ilike(search_fmt))
        )
    return query.order_by(Tool.name.asc()).all()

@router.get("/{id_or_slug}", response_model=ToolResponse)
def get_tool(id_or_slug: str, db: Session = Depends(get_db)):
    if id_or_slug.isdigit():
        tool = db.query(Tool).filter(Tool.id == int(id_or_slug)).first()
    else:
        tool = db.query(Tool).filter(Tool.slug == id_or_slug).first()
    
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return tool

@router.post("", response_model=ToolResponse, status_code=status.HTTP_201_CREATED)
def create_tool(tool_in: ToolCreate, db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    slug = tool_in.slug or slugify(tool_in.name)
    existing = db.query(Tool).filter(Tool.slug == slug).first()
    if existing:
        slug = f"{slug}-{db.query(Tool).count() + 1}"

    tool = Tool(
        name=tool_in.name,
        slug=slug,
        category=tool_in.category,
        image_url=tool_in.image_url,
        purpose=tool_in.purpose,
        typical_price_min=tool_in.typical_price_min,
        typical_price_max=tool_in.typical_price_max,
        expected_lifespan=tool_in.expected_lifespan,
        maintenance_cost_annual=tool_in.maintenance_cost_annual,
        approx_cost_per_job=tool_in.approx_cost_per_job,
        why_it_matters=tool_in.why_it_matters,
        depreciation_formula=tool_in.depreciation_formula or "(Purchase Cost + Annual Maintenance × Years) / Total Expected Jobs",
        is_verified=tool_in.is_verified
    )
    db.add(tool)
    db.commit()
    db.refresh(tool)
    return tool

@router.put("/{id}", response_model=ToolResponse)
def update_tool(id: int, tool_in: ToolUpdate, db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    tool = db.query(Tool).filter(Tool.id == id).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    
    update_data = tool_in.dict(exclude_unset=True)
    for field, val in update_data.items():
        setattr(tool, field, val)
    
    db.commit()
    db.refresh(tool)
    return tool

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tool(id: int, db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    tool = db.query(Tool).filter(Tool.id == id).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    db.delete(tool)
    db.commit()
    return None

