import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

# --- Generate random data for training ---


def generate_data(n_samples=100, noise=10, slope=2, intercept=5):
    X = np.linspace(0, 10, n_samples)
    X = X + np.random.uniform(-1, 1, n_samples)

    y = slope * X + intercept + np.random.normal(0, noise, n_samples)
    X = X.reshape(-1, 1)
    return X, y


# Random data
X, y = generate_data(noise=3)

# Preview the data
print("Sample Data (X, y):")
for i in range(5):
    print(f"({X[i][0]:.2f}, {y[i]:.2f})")

# --- Split the data ---

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Export the test data to be able to use it in Unit Tests
DATA_DIR = "./data"
os.makedirs(DATA_DIR, exist_ok=True)
print("Saving test data...")
np.save("./data/X_test.npy", X_test)
np.save("./data/y_test.npy", y_test)
print("Test data saved in the './data' directory")

# --- Train the model ---

linear_regression = LinearRegression()
linear_regression.fit(X_train, y_train)
y_pred = linear_regression.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Trained model accuracy (MSE): {mse:.2f}")
print(f"Trained model accuracy (R2 Score): {r2:.2f}")

# --- Exporting the trained model ---

MODEL_DIR = "./models"
os.makedirs(MODEL_DIR, exist_ok=True)
print("Saving trained model...")
filename = "./models/simple_v1.0.0.joblib"
joblib.dump(linear_regression, filename)
print(f"Model saved as: {filename}")
