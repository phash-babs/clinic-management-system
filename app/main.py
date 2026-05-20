from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import SessionLocal, engine
import models

from datetime import date, datetime, timedelta
from jose import JWTError, jwt

# =========================
# CONFIG
# =========================
SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()

# =========================
# APP INIT
# =========================

app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://clinic-management-system-mzen.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# CREATE TABLES
# =========================
models.Base.metadata.create_all(bind=engine)

# =========================
# AVAILABLE SLOTS
# =========================
AVAILABLE_SLOTS = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
]

# =========================
# DB SESSION
# =========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =========================
# MODELS
# =========================
class AppointmentCreate(BaseModel):
    name: str
    email: str
    phone: str
    reason: str
    appointment_date: date
    time_slot: str


class AppointmentUpdate(BaseModel):
    name: str
    email: str
    phone: str
    reason: str
    appointment_date: date
    time_slot: str


class AdminLogin(BaseModel):
    username: str
    password: str

# =========================
# PUBLIC - BOOK APPOINTMENT
# =========================
@app.post("/appointments/")
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):

    if appointment.appointment_date < date.today():
        raise HTTPException(status_code=400, detail="Cannot book past date")

    if appointment.time_slot not in AVAILABLE_SLOTS:
        raise HTTPException(status_code=400, detail="Invalid time slot")

    db_appointment = models.Appointment(**appointment.dict())

    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)

    return {
        "message": "Appointment booked!",
        "appointment_id": db_appointment.id
    }

# =========================
# PUBLIC - AVAILABLE SLOTS
# =========================
@app.get("/available-slots/")
def get_available_slots(appointment_date: date, db: Session = Depends(get_db)):

    booked = db.query(models.Appointment).filter(
        models.Appointment.appointment_date == appointment_date
    ).all()

    booked_slots = [b.time_slot for b in booked]

    available = [slot for slot in AVAILABLE_SLOTS if slot not in booked_slots]

    return {"available_slots": available}

# =========================
# ADMIN LOGIN
# =========================
@app.post("/admin/login")
def admin_login(data: AdminLogin):

    if data.username != "admin" or data.password != "1234":
        raise HTTPException(status_code=401, detail="Invalid credentials")

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    token = jwt.encode(
        {"sub": data.username, "exp": expire, "role": "admin"},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {"access_token": token}

# =========================
# ADMIN - GET ALL APPOINTMENTS
# =========================
@app.get("/admin/appointments/")
def get_appointments(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    return db.query(models.Appointment).all()

# =========================
# ADMIN - DELETE
# =========================
@app.delete("/admin/appointments/{appointment_id}")
def delete_appointment(
    appointment_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    try:
        jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    appointment = db.query(models.Appointment).filter(
        models.Appointment.id == appointment_id
    ).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    db.delete(appointment)
    db.commit()

    return {"message": "Appointment deleted"}

# =========================
# ADMIN - UPDATE
# =========================
@app.put("/admin/appointments/{appointment_id}")
def update_appointment(
    appointment_id: int,
    updated: AppointmentUpdate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    try:
        jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    appointment = db.query(models.Appointment).filter(
        models.Appointment.id == appointment_id
    ).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    for key, value in updated.dict().items():
        setattr(appointment, key, value)

    db.commit()
    db.refresh(appointment)

    return {"message": "Appointment updated"}

# =========================
# HEALTH CHECK
# =========================
@app.get("/")
def home():
    return {"message": "Clinic API is running"}