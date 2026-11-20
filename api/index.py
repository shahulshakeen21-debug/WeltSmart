import sys
import os

# Add backend directory to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(current_dir)
backend_dir = os.path.join(root_dir, "backend")

if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.main import app
from app.database import engine, Base, SessionLocal
from app.services.seed_data import seed_database
from mangum import Mangum

# Initialize database tables on serverless cold start
try:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    seed_database(db)
    db.close()
except Exception as e:
    print("Database init exception:", e)

# Handler for Vercel Serverless Function
handler = Mangum(app, lifespan="off")

# Also expose app
app = app
