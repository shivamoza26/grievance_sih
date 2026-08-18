from transformers import pipeline

MODEL_NAME = "distilbert-base-uncased-finetuned-sst-2-english"


class TransformerClassifier:

    def __init__(self):
        print("Loading transformer model...")

        self.model = pipeline(
            "text-classification",
            model=MODEL_NAME,
            top_k=None
        )

    def predict(self, text):

        results = self.model(text)[0]

        return results


if __name__ == "__main__":

    classifier = TransformerClassifier()

    examples = [
        "There are huge potholes on the main road",
        "The park bench needs painting",
        "There is an exposed electric wire near a school"
    ]

    for text in examples:

        print("\nGrievance:", text)

        result = classifier.predict(text)

        print("Model output:", result)