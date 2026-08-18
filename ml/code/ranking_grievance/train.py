import os
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score

from .preprocessing import preprocess_text


DATA_PATH = "data/grievance_classifier/training_data.csv"
MODEL_DIR = "models/grievance_classifier/small_model"
MODEL_PATH = os.path.join(MODEL_DIR, "urgency_model.pkl")


def main():

    print("Loading dataset...")

    df = pd.read_csv(DATA_PATH)

    df = df.dropna(subset=["grievance", "urgency"])

    print(f"Total samples: {len(df)}")

    # Preprocessing
    print("Preprocessing text...")

    df["cleaned_grievance"] = df["grievance"].apply(
        preprocess_text
    )

    X = df["cleaned_grievance"]
    y = df["urgency"]

    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    print(f"Training samples: {len(X_train)}")
    print(f"Testing samples : {len(X_test)}")

    # TF-IDF + Logistic Regression
    model = Pipeline([
        (
            "tfidf",
            TfidfVectorizer(
                ngram_range=(1, 2),
                min_df=1,
                max_features=20000,
                sublinear_tf=True
            )
        ),
        (
            "classifier",
            LogisticRegression(
                max_iter=2000,
                class_weight="balanced"
            )
        )
    ])

    print("\nTraining model...")

    model.fit(X_train, y_train)

    # Evaluation
    predictions = model.predict(X_test)

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    print("\n==============================")
    print("MODEL EVALUATION")
    print("==============================")

    print(f"\nAccuracy: {accuracy:.2%}\n")

    print(
        classification_report(
            y_test,
            predictions,
            zero_division=0
        )
    )

    # Save model
    os.makedirs(
        MODEL_DIR,
        exist_ok=True
    )

    joblib.dump(
        model,
        MODEL_PATH
    )

    print("==============================")
    print(f"Model saved to:")
    print(MODEL_PATH)
    print("==============================")


if __name__ == "__main__":
    main()
