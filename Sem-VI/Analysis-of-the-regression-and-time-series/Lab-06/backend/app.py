from flask import Flask, request, jsonify
from catboost import CatBoostClassifier
import pandas as pd

MODEL_FILE_SAVE_PATH = "./model"

app = Flask(__name__)

# Load the saved model
model = CatBoostClassifier()
model.load_model(f"{MODEL_FILE_SAVE_PATH}/census_catboost_model.cbm", format="cbm")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    # Make sure the training and prediction columns are in the same order
    # to avoid type errors
    features_dict = {
        "age": data["age"],
        "workclass": data["workclass"],
        "education": data["education"],
        "marital.status": data["marital_status"],
        "occupation": data["occupation"],
        "relationship": data["relationship"],
        "sex": data["sex"],
        "capital.gain": data["capital_gain"],
        "capital.loss": data["capital_loss"],
        "hours.per.week": data["hours_per_week"],
    }
    columns = [
        "age",
        "workclass",
        "education",
        "marital.status",
        "occupation",
        "relationship",
        "sex",
        "capital.gain",
        "capital.loss",
        "hours.per.week",
    ]
    features = pd.DataFrame([features_dict], columns=columns)
    prediction = int(model.predict(features)[0])
    return jsonify({"prediction": prediction})


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000)
