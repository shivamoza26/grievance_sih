from datetime import datetime

from app.db.database import Base
from sqlalchemy import (
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship


class Grievance(Base):
    __tablename__ = "grievances"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    citizen_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    # Department classification
    topic = Column(
        String,
        nullable=True,
    )

    category = Column(
        String,
        nullable=True,
    )

    confidence = Column(
        Float,
        nullable=True,
    )

    # Urgency / priority classification
    priority = Column(
        String,
        nullable=True,
    )

    priority_confidence = Column(
        Float,
        nullable=True,
    )

    location = Column(
        String,
        nullable=True,
    )

    department_id = Column(
        Integer,
        ForeignKey("departments.id"),
        nullable=True,
    )

    officer_id = Column(
        Integer,
        ForeignKey("officers.id"),
        nullable=True,
    )

    status = Column(
        String,
        nullable=False,
        default="SUBMITTED",
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    citizen = relationship("User")

    department = relationship("Department")

    officer = relationship("Officer")
