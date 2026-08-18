import torch
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification
)

from .preprocessing import preprocess_text


MODEL_PATH = "models/grievance_classifier/large_model"

LABELS = {
    0: "LOW",
    1: "MEDIUM",
    2: "HIGH",
    3: "CRITICAL"
}


class UrgencyClassifier:

    def __init__(self):

        self.tokenizer = AutoTokenizer.from_pretrained(
            MODEL_PATH
        )

        self.model = AutoModelForSequenceClassification.from_pretrained(
            MODEL_PATH
        )

        self.model.eval()

    def predict(self, grievance):

        cleaned_text = preprocess_text(
            grievance
        )

        inputs = self.tokenizer(
            cleaned_text,
            return_tensors="pt",
            truncation=True,
            max_length=128
        )

        with torch.no_grad():

            outputs = self.model(**inputs)

            probabilities = torch.softmax(
                outputs.logits,
                dim=1
            )[0]

        index = torch.argmax(
            probabilities
        ).item()

        return {
            "grievance": grievance,
            "cleaned_text": cleaned_text,
            "urgency": LABELS[index],
            "confidence": round(
                probabilities[index].item(),
                3
            )
        }
