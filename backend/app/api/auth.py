from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services import auth_service


router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201,
)
def register(
    payload: UserCreate,
    db: Session = Depends(get_db),
):
    return auth_service.register_user(
        db,
        payload,
    )


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = auth_service.authenticate_user(
        db,
        email=form_data.username,
        password=form_data.password,
    )

    token = auth_service.create_token_for_user(user)

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "name": user.name,
        "email": user.email,
    }