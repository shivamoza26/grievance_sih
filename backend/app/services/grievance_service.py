from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.grievance import Grievance
from app.models.resolution_history import ResolutionHistory
from app.models.user import User
from app.schemas.grievance import GrievanceCreate
from app.services import assignment_service, ml_service


def create_grievance(
    db: Session,
    payload: GrievanceCreate,
    citizen: User,
) -> Grievance:

    grievance = Grievance(
        citizen_id=citizen.id,
        description=payload.description,
        location=payload.location,
        status="SUBMITTED",
    )

    db.add(grievance)
    db.flush()

    prediction = ml_service.get_prediction(
        payload.description
    )

    grievance.topic = prediction.get("topic")
    grievance.category = prediction.get("category")
    grievance.confidence = prediction.get("confidence")

    department_id, officer_id = assignment_service.assign(
        db,
        grievance.category or "",
    )

    grievance.department_id = department_id
    grievance.officer_id = officer_id

    if officer_id is not None:
        grievance.status = "ASSIGNED"

    history = ResolutionHistory(
        grievance_id=grievance.id,
        old_status=None,
        new_status=grievance.status,
        comment=(
            "Grievance submitted"
            + (
                f" and auto-assigned "
                f"(category: {grievance.category})"
                if officer_id
                else ""
            )
        ),
        changed_by=citizen.id,
    )

    db.add(history)

    db.commit()
    db.refresh(grievance)

    return grievance


def get_grievance(
    db: Session,
    grievance_id: int,
) -> Grievance:

    grievance = (
        db.query(Grievance)
        .filter(Grievance.id == grievance_id)
        .first()
    )

    if not grievance:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Grievance not found",
        )

    return grievance


def assert_can_view(
    grievance: Grievance,
    user: User,
) -> None:

    if user.role == "ADMIN":
        return

    if (
        user.role == "CITIZEN"
        and grievance.citizen_id == user.id
    ):
        return

    if (
        user.role == "OFFICER"
        and grievance.officer_id is not None
    ):
        return

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Not authorized to view this grievance",
    )


def update_status(
    db: Session,
    grievance_id: int,
    new_status: str,
    comment: str | None,
    changed_by: User,
) -> Grievance:

    grievance = get_grievance(
        db,
        grievance_id,
    )

    old_status = grievance.status
    grievance.status = new_status

    history = ResolutionHistory(
        grievance_id=grievance.id,
        old_status=old_status,
        new_status=new_status,
        comment=comment,
        changed_by=changed_by.id,
    )

    db.add(history)

    db.commit()
    db.refresh(grievance)

    return grievance


def add_reply(
    db: Session,
    grievance_id: int,
    comment: str,
    changed_by: User,
) -> ResolutionHistory:

    grievance = get_grievance(
        db,
        grievance_id,
    )

    history = ResolutionHistory(
        grievance_id=grievance.id,
        old_status=grievance.status,
        new_status=grievance.status,
        comment=comment,
        changed_by=changed_by.id,
    )

    db.add(history)

    db.commit()
    db.refresh(history)

    return history