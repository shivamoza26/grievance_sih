import os
import pandas as pd

from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
    DataCollatorWithPadding
)


DATA_PATH = "data/grievance_classifier/training_data.csv"
MODEL_PATH = "models/grievance_classifier/large_model"

# Multilingual model: English + Hindi + many other languages
MODEL_NAME = "bert-base-multilingual-cased"


LABELS = {
    "LOW": 0,
    "MEDIUM": 1,
    "HIGH": 2,
    "CRITICAL": 3
}


def main():

    print("Loading dataset...")

    df = pd.read_csv(DATA_PATH)

    df = df.dropna(
        subset=["grievance", "urgency"]
    )

    df["label"] = df["urgency"].map(LABELS)

    df = df[
        ["grievance", "label"]
    ]

    print(f"Total samples: {len(df)}")

    dataset = Dataset.from_pandas(
        df,
        preserve_index=False
    )

    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_NAME
    )

    def tokenize(batch):

        return tokenizer(
            batch["grievance"],
            truncation=True,
            max_length=128
        )

    print("Tokenizing...")

    dataset = dataset.map(
        tokenize,
        batched=True
    )

    dataset = dataset.train_test_split(
        test_size=0.2,
        seed=42
    )

    print(
        f"Training samples: {len(dataset['train'])}"
    )

    print(
        f"Testing samples : {len(dataset['test'])}"
    )

    print("Loading multilingual model...")

    model = AutoModelForSequenceClassification.from_pretrained(
        MODEL_NAME,
        num_labels=4,
        id2label={
            0: "LOW",
            1: "MEDIUM",
            2: "HIGH",
            3: "CRITICAL"
        },
        label2id=LABELS
    )

    training_args = TrainingArguments(
        output_dir=MODEL_PATH,

        num_train_epochs=4,

        per_device_train_batch_size=8,
        per_device_eval_batch_size=8,

        learning_rate=2e-5,

        weight_decay=0.01,

        logging_steps=50,

        eval_strategy="epoch",
        save_strategy="epoch",

        load_best_model_at_end=True,

        report_to="none"
    )

    data_collator = DataCollatorWithPadding(
        tokenizer=tokenizer
    )

    trainer = Trainer(
        model=model,

        args=training_args,

        train_dataset=dataset["train"],

        eval_dataset=dataset["test"],

        data_collator=data_collator
    )

    print("\n================================")
    print("TRAINING MULTILINGUAL MODEL")
    print("================================")

    trainer.train()

    print("\nSaving model...")

    os.makedirs(
        MODEL_PATH,
        exist_ok=True
    )

    trainer.save_model(
        MODEL_PATH
    )

    tokenizer.save_pretrained(
        MODEL_PATH
    )

    print("\n================================")
    print("Training completed!")
    print(f"Model saved at: {MODEL_PATH}")
    print("================================")


if __name__ == "__main__":
    main()
