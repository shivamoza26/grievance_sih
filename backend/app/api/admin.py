from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.deps import get_db, require_roles
from app.models.department import Department
from app.models.grievance import Grievance
from app.models.user import User
from app.services import analytics_service


router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.get("/grievances")
def list_all_grievances(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("ADMIN")),
    status: str | None = Query(None),
    category: str | None = Query(None),
    search: str | None = Query(None),
    limit: int = Query(100, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    query = db.query(Grievance)

    if status and status != "ALL":
        query = query.filter(Grievance.status == status)

    if category and category != "ALL":
        query = query.filter(Grievance.category == category)

    if search:
        query = query.join(User, Grievance.citizen_id == User.id).filter(
            Grievance.description.ilike(f"%{search}%")
            | User.name.ilike(f"%{search}%")
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


@router.get("/analytics")
def get_analytics(
    location: str | None = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("ADMIN")),
):
    return analytics_service.get_admin_analytics(
        db,
        location_filter=location,
    )


@router.get("/departments")
def get_departments(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("ADMIN")),
):
    return db.query(Department).order_by(Department.name.asc()).all()
