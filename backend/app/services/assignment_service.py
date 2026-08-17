from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.category import Category
from app.models.grievance import Grievance
from app.models.officer import Officer


OPEN_STATUSES = (
    "SUBMITTED",
    "ASSIGNED",
    "IN_PROGRESS",
)


def resolve_department_id(
    db: Session,
    category_name: str,
) -> int | None:

    category = (
        db.query(Category)
        .filter(Category.name == category_name)
        .first()
    )

    return category.department_id if category else None


def pick_officer_id(
    db: Session,
    department_id: int,
) -> int | None:

    open_count = (
        db.query(
            Grievance.officer_id,
            func.count(Grievance.id).label("open_count"),
        )
        .filter(
            Grievance.officer_id.isnot(None),
            Grievance.status.in_(OPEN_STATUSES),
        )
        .group_by(Grievance.officer_id)
        .subquery()
    )

    officer = (
        db.query(Officer)
        .outerjoin(
            open_count,
            Officer.id == open_count.c.officer_id,
        )
        .filter(
            Officer.department_id == department_id,
        )
        .order_by(
            func.coalesce(
                open_count.c.open_count,
                0,
            ).asc()
        )
        .first()
    )

    return officer.id if officer else None


def assign(
    db: Session,
    category_name: str,
) -> tuple[int | None, int | None]:

    department_id = resolve_department_id(
        db,
        category_name,
    )

    if department_id is None:
        return None, None

    officer_id = pick_officer_id(
        db,
        department_id,
    )

    return department_id, officer_id