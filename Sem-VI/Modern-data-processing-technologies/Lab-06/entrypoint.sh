#!/bin/sh

MODEL_DIR="./models"
MODEL_FILE="${MODEL_DIR}/simple_v1.0.0.joblib"

mkdir -p "$MODEL_DIR"

# Check or create the model file
if [ ! -f "$MODEL_FILE" ]; then
	echo "Model file not found at $MODEL_FILE. Running train.py..."
	python train.py
else
	echo "Model file found at $MODEL_FILE. Skipping training."
fi

echo "Starting FastAPI server..."
exec "$@"
