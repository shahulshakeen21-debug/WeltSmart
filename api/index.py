import sys
import os
import traceback

# Add root and backend to sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
backend_dir = os.path.join(root_dir, "backend")

if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

try:
    from app.main import app
    from app.database import engine, Base, SessionLocal
    from app.services.seed_data import seed_database

    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        seed_database(db)
        db.close()
    except Exception as db_err:
        print("Database init note:", db_err)

except Exception as err:
    from fastapi import FastAPI
    app = FastAPI(title="WeldCost API Error Handler")

    @app.get("/api/health")
    def health_err():
        return {
            "status": "backend_import_error",
            "error": str(err),
            "traceback": traceback.format_exc(),
            "sys_path": sys.path
        }

    @app.get("/api/{path:path}")
    def fallback_err(path: str):
        return {
            "status": "backend_import_error",
            "path": path,
            "error": str(err),
            "traceback": traceback.format_exc()
        }
