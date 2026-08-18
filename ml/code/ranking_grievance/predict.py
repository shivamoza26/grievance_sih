import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

MODEL_PATH = "models/grievance_classifier/large_model"

LABELS = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]


def predict_urgency(grievance):
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

    inputs = tokenizer(
        grievance,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    with torch.no_grad():
        outputs = model(**inputs)

    probabilities = torch.softmax(outputs.logits, dim=-1)
    predicted_id = torch.argmax(probabilities, dim=-1).item()
    confidence = probabilities[0][predicted_id].item() * 100

    return LABELS[predicted_id], confidence


if __name__ == "__main__":
    grievance = input("\nEnter grievance: ")

    urgency, confidence = predict_urgency(grievance)

    print("\n==============================")
    print("GRIEVANCE PREDICTION")
    print("==============================")
    print(f"Urgency   : {urgency}")
    print(f"Confidence: {confidence:.2f}%")
    print("==============================")
