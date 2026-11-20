import datetime
from sqlalchemy import Column, Integer, Float, String, DateTime, Text, Boolean
from app.database import Base

class Tool(Base):
    __tablename__ = "tools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True)
    category = Column(String(100), default="Equipment")  # Machines, Safety, Grinding, Consumables, Accessories
    image_url = Column(String(500), nullable=True)
    purpose = Column(Text, nullable=False)
    
    # Financials
    typical_price_min = Column(Float, nullable=False)
    typical_price_max = Column(Float, nullable=False)
    expected_lifespan = Column(String(100), default="3-5 Years (4000 hours)")
    maintenance_cost_annual = Column(Float, default=2500.0)
    approx_cost_per_job = Column(Float, default=65.0)
    
    # Transparency Education
    why_it_matters = Column(Text, nullable=False)
    depreciation_formula = Column(String(255), default="(Purchase Cost + Annual Maintenance × Years) / Total Expected Jobs")
    
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

