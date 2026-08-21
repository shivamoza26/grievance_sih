import torch
from transformers import (
    AutoModelForSequenceClassification,
    AutoTokenizer,
)

MODEL_ID = "shivmexe/grievance-urgency-v1"


class UrgencyClassifier:
    def __init__(self, model_id: str):

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        print(f"Loading urgency model: {model_id}")

        print(f"Using device: {self.device}")

        self.tokenizer = AutoTokenizer.from_pretrained(model_id)

        self.model = AutoModelForSequenceClassification.from_pretrained(model_id)

        self.model.to(self.device)
        self.model.eval()

        print("Urgency model loaded successfully.")

    @torch.inference_mode()
    def predict(self, text: str) -> dict:

        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=96,
        )

        inputs = {key: value.to(self.device) for key, value in inputs.items()}

        outputs = self.model(**inputs)

        probabilities = torch.softmax(
            outputs.logits,
            dim=-1,
        )[0]

        predicted_id = torch.argmax(probabilities).item()

        confidence = probabilities[predicted_id].item()

        priority = self.model.config.id2label[predicted_id]
        return {
            "priority": priority,
            "confidence": confidence,
        }


urgency_classifier = UrgencyClassifier(MODEL_ID)


def get_prediction(text: str) -> dict:

    prediction = urgency_classifier.predict(text)

    return {
        "priority": prediction["priority"],
        "confidence": prediction["confidence"],
    }
