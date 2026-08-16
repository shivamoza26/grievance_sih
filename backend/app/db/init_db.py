from app.db.database import Base, engine

from app.models.user import User
from app.models.department import Department
from app.models.officer import Officer
from app.models.category import Category
from app.models.grievance import Grievance
from app.models.resolution_history import ResolutionHistory


Base.metadata.create_all(bind=engine)

print("Database tables created successfully!")