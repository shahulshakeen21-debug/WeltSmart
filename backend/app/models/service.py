import datetime
from sqlalchemy import Column, Integer, Float, String, DateTime, Text, Boolean, JSON
from app.database import Base

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True)
    category = Column(String(100), default="Fabrication")
    description = Column(Text, nullable=False)
    
    # Estimated Price Range (Not fixed!)
    min_price = Column(Float, nullable=False)
    max_price = Column(Float, nullable=False)
    typical_duration_hours = Column(Float, default=4.0)
    complexity = Column(String(50), default="Medium")  # Low, Medium, High, Extreme
    
    # Breakdown typical ratios (for educational hints)
    typical_materials = Column(String(255), default="Mild Steel Square Pipes & Angles")
    typical_tools = Column(String(255), default="Arc Inverter, Angle Grinder, Cutting Stand, F-Clamps")
    recommended_welding_type = Column(String(50), default="Arc welding")
    
    # Preset parameters for instant quote generation
    preset_params = Column(JSON, nullable=True)
    image_url = Column(String(500), nullable=True)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

