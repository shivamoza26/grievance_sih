import re
from rapidfuzz import process, fuzz


KNOWN_WORDS = [
    "toilet",
    "clean",
    "scholarship",
    "released",
    "street",
    "light",
    "water",
    "garbage",
    "pothole",
    "road",
    "sewage",
    "school",
    "washroom",
    "electric",
    "wire",
    "manhole",
    "fire",
    "accident",
    "park",
    "bench",
    "drain",
    "damage",
    "broken",
    "working",
]


def clean_text(text: str) -> str:
    text = str(text).lower()

    # Remove URLs
    text = re.sub(
        r"http\S+|www\S+",
        " ",
        text
    )

    # Keep:
    # - English letters
    # - numbers
    # - Hindi/Devanagari characters
    # - spaces
    text = re.sub(
        r"[^a-z0-9\u0900-\u097F\s]",
        " ",
        text
    )

    # Remove extra spaces
    text = re.sub(
        r"\s+",
        " ",
        text
    ).strip()

    return text


def correct_typos(text: str) -> str:

    words = text.split()
    corrected_words = []

    for word in words:

        # Hindi words should not be compared
        # with English vocabulary.
        if re.search(r"[\u0900-\u097F]", word):
            corrected_words.append(word)
            continue

        # Don't modify very short words
        if len(word) <= 3:
            corrected_words.append(word)
            continue

        match = process.extractOne(
            word,
            KNOWN_WORDS,
            scorer=fuzz.ratio
        )

        if match:
            matched_word, score, _ = match

            if score >= 80:
                corrected_words.append(matched_word)
            else:
                corrected_words.append(word)
        else:
            corrected_words.append(word)

    return " ".join(corrected_words)


def preprocess_text(text: str) -> str:

    text = clean_text(text)

    text = correct_typos(text)

    return text


if __name__ == "__main__":

    examples = [
        "toilt are not cleen",
        "schoship not relased",
        "no strete ligt is working",
        "सड़क पर बहुत बड़े गड्ढे हैं",
        "बिजली का तार सड़क पर गिर गया है",
        "road pe bahut bade potholes hain",
        "bijli ka taar road pe gir gaya hai"
    ]

    for text in examples:

        print("Original :", text)

        print(
            "Processed:",
            preprocess_text(text)
        )

        print()