from database import Base
from sqlalchemy import Column, Integer, String, Date

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String, nullable=False)
    reason = Column(String)
    appointment_date = Column(Date)
    time_slot = Column(String, nullable=False)