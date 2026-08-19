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
            Grievance.location.ilike(f"%{location_filter}%")
        )

    grievances = query.all()

    total = len(grievances)
    status_counts: dict[str, int] = {}
    category_counts: dict[str, int] = {}

    for grievance in grievances:
        status_counts[grievance.status] = status_counts.get(
            grievance.status, 0
        ) + 1

        category = grievance.category or "Uncategorized"
        category_counts[category] = category_counts.get(category, 0) + 1

    resolved = status_counts.get("RESOLVED", 0)
    resolution_rate = round((resolved / total) * 100, 2) if total else 0.0

    # Return department workload in a frontend-friendly shape.
    departments = (
        db.query(Department)
        .order_by(Department.name.asc())
        .all()
    )

    by_department = {}
    for department in departments:
        department_grievances = [
            g for g in grievances if g.department_id == department.id
        ]
        assigned = len(department_grievances)
        resolved_count = sum(
            1 for g in department_grievances if g.status == "RESOLVED"
        )
        by_department[department.name] = {
            "assigned": assigned,
            "resolved": resolved_count,
            "pending": max(assigned - resolved_count, 0),
        }

    return {
        "total": total,
        "by_status": status_counts,
        "by_category": category_counts,
        "by_department": by_department,
        "resolution_rate": resolution_rate,
    }
