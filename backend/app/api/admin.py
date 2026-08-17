from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_db, require_roles
from app.models.user import User
from app.services import analytics_service


router = APIRouter(
    prefix="/api/admin",
    tags=["admin"],
)


@router.get("/analytics")
def get_analytics(
    location: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("ADMIN")
    ),
):
    return analytics_service.get_admin_analytics(
        db,
        location_filter=location,
    )