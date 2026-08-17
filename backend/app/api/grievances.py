from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import (
    get_current_user,
    get_db,
    require_roles,
)
from app.models.user import User
from app.schemas.grievance import (
    GrievanceCreate,
    GrievanceReplyCreate,
    GrievanceResponse,
    GrievanceStatusUpdate,
)
from app.schemas.resolution_history import (
    ResolutionHistoryResponse,
)
from app.services import grievance_service


router = APIRouter(
    prefix="/api/grievances",
    tags=["grievances"],
)


@router.post(
    "",
    response_model=GrievanceResponse,
    status_code=201,
)
def submit_grievance(
    payload: GrievanceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("CITIZEN")
    ),
):
    return grievance_service.create_grievance(
        db,
        payload,
        current_user,
    )


@router.get(
    "/{grievance_id}",
    response_model=GrievanceResponse,
)
def view_grievance(
    grievance_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    grievance = grievance_service.get_grievance(
        db,
        grievance_id,
    )

    grievance_service.assert_can_view(
        grievance,
        current_user,
    )

    return grievance


@router.put(
    "/{grievance_id}/status",
    response_model=GrievanceResponse,
)
def update_grievance_status(
    grievance_id: int,
    payload: GrievanceStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("OFFICER", "ADMIN")
    ),
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
    current_user: User = Depends(
        require_roles("OFFICER", "ADMIN")
    ),
):
    return grievance_service.add_reply(
        db,
        grievance_id,
        payload.comment,
        current_user,
    )