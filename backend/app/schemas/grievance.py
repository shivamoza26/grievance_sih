from datetime import datetime
from pydantic import BaseModel


class GrievanceCreate(BaseModel):
    citizen_id: int
    description: str
    location: str | None = None


class GrievanceResponse(BaseModel):
    id: int
    citizen_id: int
    description: str
    topic: str | None
    category: str | None
    confidence: float | None
    location: str | None
    department_id: int | None
    officer_id: int | None
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }