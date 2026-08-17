from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.grievance import Grievance
from app.models.officer import Officer
from app.models.user import User


def get_officer_for_user(
    db: Session,
    user: User,
) -> Officer:

    officer = (
        db.query(Officer)
        .filter(Officer.user_id == user.id)
        .first()
    )

    if not officer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="This user is not registered as an officer",
        )

    return officer


def get_officer_queue(
    db: Session,
    user: User,
) -> list[Grievance]:

    officer = get_officer_for_user(
        db,
        user,
    )

    return (
        db.query(Grievance)
        .filter(
            Grievance.officer_id == officer.id
        )
        .order_by(
            Grievance.created_at.asc()
        )
        .all()
    )