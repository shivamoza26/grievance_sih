import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

MODEL_PATH = "models/grievance_classifier/large_model"

LABELS = {
    0: "LOW",
    1: "MEDIUM",
    2: "HIGH",
    3: "CRITICAL"
}


class UrgencyTransformer:

    def __init__(self):

        print("Loading urgency model...")

        self.tokenizer = AutoTokenizer.from_pretrained(
            MODEL_PATH
        )

        self.model = AutoModelForSequenceClassification.from_pretrained(
            MODEL_PATH
        )

        self.model.eval()

    def predict(self, text):

        inputs = self.tokenizer(
            text,
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

        index = torch.argmax(probabilities).item()

        return {
            "urgency": LABELS[index],
            "confidence": round(
                probabilities[index].item(),
                3
            )
        }


if __name__ == "__main__":

    classifier = UrgencyTransformer()

    while True:

        text = input("\nEnter grievance (exit to stop): ")

        if text.lower() == "exit":
            break

        result = classifier.predict(text)

        print("Urgency    :", result["urgency"])
        print("Confidence :", result["confidence"])
