import datetime
from sqlalchemy import Column, Integer, Float, String, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class Quote(Base):
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True)
    quote_number = Column(String(50), unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    
    # Customer Info
    customer_name = Column(String(255), default="Guest Customer")
    customer_email = Column(String(255), nullable=True)
    customer_phone = Column(String(50), nullable=True)
    location = Column(String(255), default="Local Workshop")
    urgency = Column(String(50), default="Standard")  # Standard, Rush, Emergency
    
    # Service & Specs
    service_name = Column(String(255), default="Custom Welding Work")
    welding_type = Column(String(50), default="Arc welding")
    material_type = Column(String(100), default="Mild Steel")
    material_quantity_kg = Column(Float, default=10.0)
    number_of_joints = Column(Integer, default=8)
    duration_hours = Column(Float, default=3.0)
    labour_hours = Column(Float, default=3.0)
    transport_km = Column(Float, default=5.0)
    
    # Transparent Itemized Cost Breakdown (all in ₹ INR)
    material_cost = Column(Float, default=0.0)
    electrode_wire_cost = Column(Float, default=0.0)
    electricity_cost = Column(Float, default=0.0)
    gas_cost = Column(Float, default=0.0)
    grinding_cutting_cost = Column(Float, default=0.0)
    machine_usage_cost = Column(Float, default=0.0)
    labour_cost = Column(Float, default=0.0)
    transport_cost = Column(Float, default=0.0)
    other_expenses_cost = Column(Float, default=0.0)
    
    total_operating_cost = Column(Float, default=0.0)
    profit_margin_amount = Column(Float, default=0.0)
    recommended_price = Column(Float, default=0.0)
    
    # Mathematical explanation metadata
    breakdown_json = Column(JSON, nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String(50), default="Draft")  # Draft, Generated, Sent, Accepted, Completed
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    valid_until = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", back_populates="quotes")

