from datetime import datetime
from pydantic import BaseModel


class ResolutionHistoryCreate(BaseModel):
    grievance_id: int
    old_status: str | None = None
    new_status: str
    comment: str | None = None
    changed_by: int


class ResolutionHistoryResponse(BaseModel):
    id: int
    grievance_id: int
    old_status: str | None
    new_status: str
    comment: str | None
    changed_by: int
    changed_at: datetime

    model_config = {
        "from_attributes": True
    }