from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_db, require_roles
from app.models.user import User
from app.schemas.grievance import GrievanceResponse
from app.services import officer_service


router = APIRouter(
    prefix="/api/officer",
    tags=["officer"],
)


@router.get(
    "/grievances",
    response_model=list[GrievanceResponse],
)
def get_my_queue(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("OFFICER")
    ),
):
    return officer_service.get_officer_queue(
        db,
        current_user,
    )