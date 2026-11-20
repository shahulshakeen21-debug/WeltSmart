import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base

class Setting(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, index=True, nullable=False)
    value = Column(String(255), nullable=False)
    data_type = Column(String(50), default="float")  # float, int, string, json
    category = Column(String(100), default="Rates")   # Rates, Machine, Guidelines, Disclaimer
    description = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

