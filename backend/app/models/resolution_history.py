from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base


class ResolutionHistory(Base):
    __tablename__ = "resolution_history"

    id = Column(Integer, primary_key=True, index=True)

    grievance_id = Column(
        Integer,
        ForeignKey("grievances.id"),
        nullable=False
    )

    old_status = Column(String, nullable=True)
    new_status = Column(String, nullable=False)

    comment = Column(Text, nullable=True)

    changed_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    changed_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    grievance = relationship("Grievance")
    user = relationship("User")