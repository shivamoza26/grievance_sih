from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class Officer(Base):
    __tablename__ = "officers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)

    user = relationship("User")
    department = relationship("Department")