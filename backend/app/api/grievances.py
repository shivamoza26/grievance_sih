from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, get_db, require_roles
from app.models.user import User
from app.models.grievance import Grievance
from app.models.resolution_history import ResolutionHistory
from app.schemas.grievance import (
    GrievanceCreate,
    GrievanceReplyCreate,
    GrievanceResponse,
    GrievanceStatusUpdate,
)
from app.schemas.resolution_history import ResolutionHistoryResponse
from app.services import grievance_service


router = APIRouter(prefix="/api/grievances", tags=["grievances"])


@router.get("")
def list_grievances(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("CITIZEN")),
    status: str | None = Query(None),
    category: str | None = Query(None),
    search: str | None = Query(None),
    limit: int = Query(100, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    query = db.query(Grievance).filter(
        Grievance.citizen_id == current_user.id
    )

    if status and status != "ALL":
        query = query.filter(Grievance.status == status)

    if category and category != "ALL":
        query = query.filter(Grievance.category == category)

    if search:
        term = f"%{search}%"
        query = query.filter(
            Grievance.description.ilike(term)
        )

    total = query.count()
    items = (
        query.order_by(Grievance.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return {
        "items": items,
        "total": total,
        "limit": limit,
        "offset": offset,
        "has_more": offset + limit < total,
    }


@router.post("", response_model=GrievanceResponse, status_code=201)
def submit_grievance(
    payload: GrievanceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("CITIZEN")),
):
    return grievance_service.create_grievance(db, payload, current_user)


@router.get("/{grievance_id}")
def view_grievance(
    grievance_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    grievance = grievance_service.get_grievance(db, grievance_id)
    grievance_service.assert_can_view(grievance, current_user)

    history = (
        db.query(ResolutionHistory)
        .filter(
            ResolutionHistory.grievance_id == grievance_id
        )
        .order_by(ResolutionHistory.changed_at.asc())
        .all()
    )

    return {
        "grievance": grievance,
        "timeline": history,
    }


@router.put("/{grievance_id}/status", response_model=GrievanceResponse)
def update_grievance_status(
    grievance_id: int,
    payload: GrievanceStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("OFFICER", "ADMIN")),
):
    return grievance_service.update_status(
        db,
        grievance_id,
        payload.new_status,
        payload.comment,
        current_user,
    )


@router.post(
    "/{grievance_id}/reply",
    response_model=ResolutionHistoryResponse,
    status_code=201,
)
def reply_to_grievance(
    grievance_id: int,
    payload: GrievanceReplyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("OFFICER", "ADMIN")),
):
    return grievance_service.add_reply(
        db,
        grievance_id,
        payload.comment,
        current_user,
    )
