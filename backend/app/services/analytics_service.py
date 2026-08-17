from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.department import Department
from app.models.grievance import Grievance


def get_admin_analytics(
    db: Session,
    location_filter: str | None = None,
) -> dict:

    query = db.query(Grievance)

    if location_filter:
        query = query.filter(
            Grievance.location.ilike(
                f"%{location_filter}%"
            )
        )

    grievances = query.all()

    total = len(grievances)

    status_counts: dict[str, int] = {}
    category_counts: dict[str, int] = {}

    for grievance in grievances:
        status_counts[grievance.status] = (
            status_counts.get(
                grievance.status,
                0,
            ) + 1
        )

        key = grievance.category or "Uncategorized"

        category_counts[key] = (
            category_counts.get(
                key,
                0,
            ) + 1
        )

    department_counts = (
        db.query(
            Department.name,
            func.count(Grievance.id),
        )
        .outerjoin(
            Grievance,
            Grievance.department_id == Department.id,
        )
        .group_by(Department.name)
        .all()
    )

    return {
        "total": total,
        "by_status": status_counts,
        "by_category": category_counts,
        "by_department": {
            name: count
            for name, count in department_counts
        },
    }