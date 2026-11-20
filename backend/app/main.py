from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.services.seed_data import seed_database

# Routers
from app.routers.auth import router as auth_router
from app.routers.calculator import router as calculator_router
from app.routers.tools import router as tools_router
from app.routers.consumables import router as consumables_router
from app.routers.services import router as services_router
from app.routers.quotes import router as quotes_router
from app.routers.welder import router as welder_router
from app.routers.admin import router as admin_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables
    Base.metadata.create_all(bind=engine)
    # Seed default data
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="WeldCost – Industrial Welding Price & Cost Transparency Engine",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local and production deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(calculator_router, prefix=settings.API_V1_STR)
app.include_router(tools_router, prefix=settings.API_V1_STR)
app.include_router(consumables_router, prefix=settings.API_V1_STR)
app.include_router(services_router, prefix=settings.API_V1_STR)
app.include_router(quotes_router, prefix=settings.API_V1_STR)
app.include_router(welder_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "platform": "WeldCost – Welding Price & Cost Transparency Platform",
        "version": settings.VERSION,
        "docs_url": "/docs",
        "status": "operational",
        "mission": "Empowering welders to charge fairly and helping customers understand the real cost behind every weld."
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "weldcost-backend"}

