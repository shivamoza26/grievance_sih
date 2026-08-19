from app.db.database import SessionLocal
from app.models.department import Department
from app.models.category import Category


DEPARTMENTS = [
    "Banking & Financial Services",
    "Corruption & Bribery",
    "Education & Schools",
    "Electricity",
    "Employment & Labour",
    "Healthcare & Hospitals",
    "Land Records & Revenue",
    "Misc / Other",
    "Municipal Certificates",
    "Pension & Provident Fund",
    "Police & Law and Order",
    "Ration & Public Distribution System",
    "Roads & Infrastructure",
    "Sanitation & Garbage",
    "Water Supply",
]


def seed_departments_and_categories():
    db = SessionLocal()

    try:
        for name in DEPARTMENTS:
            department = (
                db.query(Department)
                .filter(Department.name == name)
                .first()
            )

            if department is None:
                department = Department(name=name)
                db.add(department)
                db.flush()

            category = (
                db.query(Category)
                .filter(Category.name == name)
                .first()
            )

            if category is None:
                category = Category(
                    name=name,
                    department_id=department.id,
                )
                db.add(category)

        db.commit()

        print(
            f"Seeded {len(DEPARTMENTS)} departments "
            f"and {len(DEPARTMENTS)} categories."
        )

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_departments_and_categories()
