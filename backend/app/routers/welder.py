from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict, Any
from app.database import get_db
from app.models.user import User
from app.models.welder_profile import WelderProfile
from app.models.quote import Quote
from app.schemas.welder import WelderProfileResponse, WelderProfileUpdate, WelderDashboardMetrics
from app.services.auth import get_current_active_welder

router = APIRouter(prefix="/welder", tags=["Welder Mode & Dashboard"])

@router.get("/profile", response_model=WelderProfileResponse)
def get_welder_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_welder)
):
    profile = db.query(WelderProfile).filter(WelderProfile.user_id == current_user.id).first()
    if not profile:
        profile = WelderProfile(user_id=current_user.id, workshop_address=current_user.workshop_name or "Local Workshop")
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("/profile", response_model=WelderProfileResponse)
def update_welder_profile(
    profile_in: WelderProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_welder)
):
    profile = db.query(WelderProfile).filter(WelderProfile.user_id == current_user.id).first()
    if not profile:
        profile = WelderProfile(user_id=current_user.id)
        db.add(profile)
    
    for field, val in profile_in.dict(exclude_unset=True).items():
        setattr(profile, field, val)
    
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/dashboard", response_model=WelderDashboardMetrics)
def get_welder_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_welder)
):
    # Query quotes linked to this welder or sample data for demonstration
    quotes = db.query(Quote).filter(Quote.user_id == current_user.id).all()
    if not quotes and current_user.role == "admin":
        quotes = db.query(Quote).all()

    total_jobs = len(quotes)
    total_revenue = sum(q.recommended_price for q in quotes)
    total_material_cost = sum(q.material_cost for q in quotes)
    total_consumable_cost = sum(q.electrode_wire_cost + q.gas_cost + q.grinding_cutting_cost for q in quotes)
    total_electricity_cost = sum(q.electricity_cost for q in quotes)
    total_labour_cost = sum(q.labour_cost for q in quotes)
    estimated_profit = sum(q.profit_margin_amount for q in quotes)

    avg_margin = (estimated_profit / total_revenue * 100) if total_revenue > 0 else 22.0

    # Monthly aggregation (mocked / real data hybrid)
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]
    monthly_financials = [
        {"month": "Jul", "revenue": 38500, "expenses": 29800, "profit": 8700, "jobs": 7},
        {"month": "Aug", "revenue": 44200, "expenses": 34100, "profit": 10100, "jobs": 9},
        {"month": "Sep", "revenue": 52800, "expenses": 40500, "profit": 12300, "jobs": 11},
        {"month": "Oct", "revenue": 61400, "expenses": 47200, "profit": 14200, "jobs": 13},
        {"month": "Nov", "revenue": round(total_revenue, 0) if total_revenue > 0 else 33918, "expenses": round(total_revenue - estimated_profit, 0) if total_revenue > 0 else 26800, "profit": round(estimated_profit, 0) if estimated_profit > 0 else 7118, "jobs": max(total_jobs, 3)},
    ]

    # Job type distribution
    service_counts = {}
    for q in quotes:
        service_counts[q.service_name] = service_counts.get(q.service_name, 0) + 1
    
    if not service_counts:
        job_type_distribution = [
            {"name": "Gates & Doors", "value": 38, "color": "#ff6b00"},
            {"name": "Window Grills", "value": 26, "color": "#f59e0b"},
            {"name": "Staircases & Railings", "value": 18, "color": "#3b82f6"},
            {"name": "Vehicles & Silencers", "value": 12, "color": "#10b981"},
            {"name": "Custom Furniture", "value": 6, "color": "#8b5cf6"},
        ]
    else:
        colors = ["#ff6b00", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899"]
        job_type_distribution = [
            {"name": k[:22] + "..." if len(k) > 22 else k, "value": v, "color": colors[i % len(colors)]}
            for i, (k, v) in enumerate(service_counts.items())
        ]

    recent_quotes = [
        {
            "id": q.id,
            "quote_number": q.quote_number,
            "customer_name": q.customer_name,
            "service_name": q.service_name,
            "recommended_price": q.recommended_price,
            "profit_margin_amount": q.profit_margin_amount,
            "status": q.status,
            "created_at": q.created_at.strftime("%d %b %Y"),
        }
        for q in sorted(quotes, key=lambda x: x.created_at, reverse=True)[:6]
    ]

    return {
        "total_jobs": total_jobs,
        "total_revenue": round(total_revenue, 2),
        "total_material_cost": round(total_material_cost, 2),
        "total_consumable_cost": round(total_consumable_cost, 2),
        "total_electricity_cost": round(total_electricity_cost, 2),
        "total_labour_cost": round(total_labour_cost, 2),
        "estimated_profit": round(estimated_profit, 2),
        "average_profit_margin_pct": round(avg_margin, 1),
        "monthly_financials": monthly_financials,
        "job_type_distribution": job_type_distribution,
        "recent_quotes": recent_quotes,
    }

