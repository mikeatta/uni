#!/bin/sh
MODEL_PATH="model/census_catboost_model.cbm"

if [ ! -f "$MODEL_PATH" ]; then
    echo "Model not found at $MODEL_PATH. Running training pipeline..."
    python model_training.py
else
    echo "Model found at $MODEL_PATH. Skipping training."
fi

exec python app.py