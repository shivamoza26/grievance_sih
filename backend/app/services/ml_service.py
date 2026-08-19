import httpx

from app.core.config import settings


_MOCK_KEYWORD_MAP: dict[str, str] = {
    "scholarship": "Education",
    "school": "Education",
    "college": "Education",
    "water": "Water Supply",
    "electricity": "Electricity",
    "power": "Electricity",
    "road": "Roads & Infrastructure",
    "garbage": "Sanitation",
    "waste": "Sanitation",
    "hospital": "Health",
    "medicine": "Health",
    "pension": "Social Welfare",
}

_DEFAULT_CATEGORY = "General"


def _mock_predict(text: str) -> dict:
    lowered = text.lower()

    for keyword, category in _MOCK_KEYWORD_MAP.items():
        if keyword in lowered:
            return {
                "topic": category,
                "category": category,
                "confidence": 0.6,
                "summary": text[:140],
            }

    return {
        "topic": _DEFAULT_CATEGORY,
        "category": _DEFAULT_CATEGORY,
        "confidence": 0.3,
        "summary": text[:140],
    }


def get_prediction(text: str) -> dict:
    if not settings.ML_SERVICE_URL:
        return _mock_predict(text)

    try:
        response = httpx.post(
            f"{settings.ML_SERVICE_URL.rstrip('/')}/predict",
            json={"text": text},
            timeout=settings.ML_SERVICE_TIMEOUT_SECONDS,
        )

        response.raise_for_status()
        return response.json()

    except (httpx.HTTPError, ValueError):
        return _mock_predict(text)