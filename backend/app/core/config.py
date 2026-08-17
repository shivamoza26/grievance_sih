import os


class Settings:
    """
    Central app configuration.
    Reads from environment variables so secrets
    never get hardcoded/committed.
    """

    PROJECT_NAME: str = (
        "AI-Based Grievance Classification and Management System"
    )

    # JWT
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY",
        "dev-secret-change-me"
    )
    ALGORITHM: str = os.getenv(
        "ALGORITHM",
        "HS256"
    )
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv(
            "ACCESS_TOKEN_EXPIRE_MINUTES",
            "60"
        )
    )

    # ML service
    ML_SERVICE_URL: str = os.getenv(
        "ML_SERVICE_URL",
        ""
    )
    ML_SERVICE_TIMEOUT_SECONDS: float = float(
        os.getenv(
            "ML_SERVICE_TIMEOUT_SECONDS",
            "5"
        )
    )

    # CORS
    CORS_ORIGINS: list[str] = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173"
    ).split(",")


settings = Settings()