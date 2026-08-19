import os


class Settings:
    """
    Central app configuration.
    Reads from environment variables so secrets
    never get hardcoded/committed.
    """

    PROJECT_NAME: str = "AI-Based Grievance Classification and Management System"

    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-change-me")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")
    )

    # ML model
    ML_DEPARTMENT_MODEL: str = os.getenv(
        "ML_DEPARTMENT_MODEL", "shivmexe/grievance-department-large"
    )

    ML_MAX_LENGTH: int = int(os.getenv("ML_MAX_LENGTH", "96"))

    # CORS
    CORS_ORIGINS: list[str] = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(
        ","
    )


settings = Settings()

