from pydantic import BaseModel


class OfficerCreate(BaseModel):
    user_id: int
    department_id: int


class OfficerResponse(BaseModel):
    id: int
    user_id: int
    department_id: int

    model_config = {
        "from_attributes": True
    }