import datetime
from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class WelderProfile(Base):
    __tablename__ = "welder_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    # Machine parameters
    machine_name = Column(String(255), default="IGBT Inverter Arc/MIG 200A")
    machine_purchase_cost = Column(Float, default=24000.0)
    machine_lifespan_hours = Column(Float, default=4000.0)
    maintenance_cost_annual = Column(Float, default=3000.0)
    default_power_rating_kw = Column(Float, default=4.5)
    
    # Rates
    electricity_rate_kwh = Column(Float, default=9.5)       # ₹ per kWh
    hourly_labour_rate = Column(Float, default=300.0)        # ₹ per hour
    helper_labour_rate = Column(Float, default=150.0)        # ₹ per hour
    transport_cost_per_km = Column(Float, default=16.0)      # ₹ per km
    target_profit_margin_pct = Column(Float, default=22.0)   # %
    
    # Location & details
    workshop_address = Column(Text, nullable=True)
    city = Column(String(100), default="Mumbai")
    experience_years = Column(Integer, default=5)
    certifications = Column(String(255), nullable=True)
    
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="welder_profile")

