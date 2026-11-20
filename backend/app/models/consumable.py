import datetime
from sqlalchemy import Column, Integer, Float, String, DateTime, Text, Boolean
from app.database import Base

class Consumable(Base):
    __tablename__ = "consumables"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(100), default="Electrode")  # Electrode, Wire, Gas, Discs, Chemical, Safety
    unit = Column(String(50), default="piece")            # kg, piece, liter, cylinder, meter
    unit_price = Column(Float, nullable=False)           # in ₹ INR
    description = Column(Text, nullable=True)
    burn_rate_or_yield = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

