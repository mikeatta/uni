from typing import List, Union
import joblib
from fastapi import FastAPI, HTTPException
import numpy as np
from pydantic import BaseModel, field_validator
import re

app = FastAPI()

# Import the trained model
MODEL_PATH = "./models/simple_v1.0.0.joblib"
MODEL_VERSION = "1.0.0"

try:
    print("Loading the model...")
    model = joblib.load(MODEL_PATH)
    match = re.search(r"v(\d+\.\d+\.\d+)", MODEL_PATH)  # Search for "vX.Y.Z"
    if match:
        MODEL_VERSION = match.group(1)
    print(f"Model (v{MODEL_VERSION}) successfully loaded!")
except FileNotFoundError:
    print(f"Error: Model file not found at {MODEL_PATH}")
    model = None


@app.get("/")
def read_root():
    return {"Welcome message": "Hello from FastAPI"}


@app.get("/info")
def read_info():
    if model is None:
        return {"error": "Model not loaded."}

    model_type = type(model).__name__  # Get model type, e.g. 'LinearRegression'
    n_features = (
        model.coef_.shape[0] if hasattr(model, "coef_") else None
    )  # Get model features
    version = MODEL_VERSION
    params = {}  # Get model params
    if hasattr(model, "coef_"):
        params["coefficients"] = model.coef_.tolist()

    return {
        "model_type": model_type,
        "n_features": n_features,
        "version": version,
        "params": params,
    }


@app.get("/health")
def read_health():
    return {"status": "ok"}


# --- Pydantic validation ---


# Pydantic validation model
class PredictionInput(BaseModel):
    input_data: List[Union[int, float]]  # Accept both ints, and floats

    @field_validator("input_data")
    def check_if_list_and_not_empty(cls, v):
        if not isinstance(v, list):
            raise ValueError("Input must be a list of numbers.")

        if not v:
            raise ValueError("Input list cannot be empty.")
        return v


@app.post("/predict")
async def predict(input_model: PredictionInput):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded.")

    try:
        features = np.array(input_model.input_data).reshape(-1, 1)
        predictions = model.predict(features)
        return {"predictions": predictions.tolist()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
