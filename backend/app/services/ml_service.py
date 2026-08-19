import json

import torch
from huggingface_hub import hf_hub_download
from transformers import (
    AutoModelForSequenceClassification,
    AutoTokenizer,
)

from app.core.config import settings


class DepartmentClassifier:
    def __init__(self, model_id: str):
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        print(f"Loading department model: {model_id}")
        print(f"Using device: {self.device}")

        self.tokenizer = AutoTokenizer.from_pretrained(model_id)

        self.model = AutoModelForSequenceClassification.from_pretrained(
            model_id
        )

        self.model.to(self.device)
        self.model.eval()

        label_map_path = hf_hub_download(
            repo_id=model_id,
            filename="label_map.json",
        )

        with open(label_map_path, encoding="utf-8") as f:
            self.label_map = json.load(f)

        print("Department model loaded successfully.")

    @torch.inference_mode()
    def predict(self, text: str) -> dict:
        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=settings.ML_MAX_LENGTH,
        )

        inputs = {
            key: value.to(self.device)
            for key, value in inputs.items()
        }

        outputs = self.model(**inputs)

        probabilities = torch.softmax(outputs.logits, dim=-1)

        confidence, predicted_id = torch.max(
            probabilities,
            dim=-1,
        )

        predicted_id = predicted_id.item()
        confidence = confidence.item()

        department = self.label_map[str(predicted_id)]

        return {
            "department": department,
            "confidence": confidence,
        }


department_classifier = DepartmentClassifier(
    settings.ML_DEPARTMENT_MODEL
)


def get_prediction(text: str) -> dict:
    prediction = department_classifier.predict(text)

    return {
        "topic": prediction["department"],
        "category": prediction["department"],
        "confidence": prediction["confidence"],
    }
