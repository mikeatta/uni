import mlflow
import mlflow.sklearn
import numpy as np
import pandas as pd
import matplotlib as plt
from sklearn.metrics import mean_squared_error, r2_score

# --- Add tracking URI for MlFlow ---
mlflow.set_tracking_uri("http://localhost:5000")  # Point to 127.0.0.1:5000

# Load "colorful-rat-197"
loaded_model = mlflow.sklearn.load_model(
    "runs:/1e8086149cff403e8f8f3f45fbd62283/model")

# --- Create testing dataset ---
# Create test samples within the original dataset's range
test_ages_within_range = np.array([19, 25, 29, 32]).reshape(-1, 1)
expected_premiums_within_range = np.array([11500, 20000, 24500, 26800])

# Create test samples that fall outside of original dataset's range
test_ages_outside_range = np.array([16, 35, 40]).reshape(-1, 1)
expected_premiums_outside_range = np.array([8000, 28500, 32000])

test_all_ages = np.concatenate(
    (test_ages_within_range, test_ages_outside_range))
test_all_premiums = np.concatenate((
    expected_premiums_within_range, expected_premiums_outside_range))

test_df = pd.DataFrame(test_all_ages, columns=["Age"])

# --- Make predictions with the loaded model ---
predictions = loaded_model.predict(test_all_ages)

# --- View model results ---
# Print the model's predictions
for i, (age, prediction) in enumerate(zip(test_all_ages.flatten(), predictions)):
    print(f"Age: {age} years, Predicted Premium: {prediction:.2f}")

# Calculate and print the MSE, and R2
mse = mean_squared_error(test_all_premiums, predictions)
r2 = r2_score(test_all_premiums, predictions)
print(f"MSE Score: {mse:.2f}")
print(f"R2 Score: {r2:.2f}")
