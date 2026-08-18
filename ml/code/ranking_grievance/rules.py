import re


CRITICAL_PATTERNS = [
    r"\bfire\b",
    r"\baccident\b",
    r"\bopen manhole\b",
    r"\bexposed electric wire\b",
    r"\bcontaminated water\b",
    r"\bgas leak\b",
    r"\bsewage.*overflow",
    r"\belectric pole.*fall",
]

HIGH_PATTERNS = [
    r"\bpothole\b",
    r"\bpot hole\b",
    r"\bno street light\b",
    r"\bstreet light.*not working",
    r"\bscholarship.*not released",
    r"\bgarbage.*not collected",
    r"\bno water supply\b",
    r"\broad.*completely damaged",
    r"\btoilet.*dirty",
    r"\bwashroom.*dirty",
]


def rule_based_urgency(text):

    text = text.lower()

    for pattern in CRITICAL_PATTERNS:
        if re.search(pattern, text):
            return "CRITICAL"

    for pattern in HIGH_PATTERNS:
        if re.search(pattern, text):
            return "HIGH"

    return None