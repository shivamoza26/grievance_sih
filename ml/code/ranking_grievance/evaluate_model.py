import pandas as pd
import numpy as np
from datasets import Dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, classification_report, confusion_matrix


MODEL_PATH = "models/grievance_classifier/large_model"
DATA_PATH = "data/grievance_classifier/holdout_data.csv"

LABELS = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]


def main():
    print("Loading dataset...")

    df = pd.read_csv(DATA_PATH)

    label_map = {
        "LOW": 0,
        "MEDIUM": 1,
        "HIGH": 2,
        "CRITICAL": 3
    }

    df["label"] = df["urgency"].map(label_map)
    dataset = Dataset.from_pandas(
        df[["grievance", "label"]]
    ).rename_column("grievance", "text")

    dataset = dataset.train_test_split(
        test_size=0.2,
        seed=42
    )

    test_dataset = dataset["test"]

    print(f"Testing samples: {len(test_dataset)}")

    print("Loading tokenizer and model...")

    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

    def tokenize(batch):
        return tokenizer(
            batch["text"],
            truncation=True,
            padding="max_length",
            max_length=128
        )

    test_dataset = test_dataset.map(tokenize, batched=True)

    test_dataset = test_dataset.remove_columns(["text"])
    test_dataset.set_format("torch")

    print("\nRunning evaluation...")

    trainer = Trainer(
        model=model
    )

    predictions = trainer.predict(test_dataset)

    predicted_labels = np.argmax(predictions.predictions, axis=1)
    actual_labels = predictions.label_ids

    accuracy = accuracy_score(actual_labels, predicted_labels)

    precision, recall, f1, _ = precision_recall_fscore_support(
        actual_labels,
        predicted_labels,
        average="weighted"
    )

    print("\n================================")
    print("MODEL EVALUATION")
    print("================================")
    print(f"Accuracy : {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall   : {recall:.4f}")
    print(f"F1 Score : {f1:.4f}")

    print("\nClassification Report:")
    print(
        classification_report(
            actual_labels,
            predicted_labels,
            target_names=LABELS
        )
    )

    print("Confusion Matrix:")
    print(confusion_matrix(actual_labels, predicted_labels))

    print("================================")


if __name__ == "__main__":
    main()
