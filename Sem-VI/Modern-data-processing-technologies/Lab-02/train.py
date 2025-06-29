import pandas as pd
import mlflow
import mlflow.sklearn
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# --- Add tracking URI for MlFlow ---
mlflow.set_tracking_uri("http://localhost:5000")  # Point to 127.0.0.1:5000

# --- Loading the dataset via Pandas ---
df = pd.read_csv("data/simplelinearregression.csv")

# --- Partition the dataset into features, and labels ---
X = df.iloc[:, 0].values.reshape(-1, 1)
y = df.iloc[:, 1].values

# Define test parameters
fit_intercept_options = [True, False]
positive_options = [True, False]
n_jobs = [1, 50, 250, 500, 1000]

# --- Train and test the model ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)

print("Start training loop...")
# Training and logging loop that tests all possible param configurations
for fit_intercept in fit_intercept_options:
    for positive in positive_options:
        for job_count in n_jobs:
            with mlflow.start_run():
                # Log currently set parameters
                mlflow.log_param("n_jobs", n_jobs)
                mlflow.log_param("positive", positive)
                mlflow.log_param("fit_intercept", fit_intercept)

                # Train the model with current parameters
                model = LinearRegression(fit_intercept=fit_intercept,
                                         n_jobs=job_count, positive=positive)
                model.fit(X_train, y_train)

                # Make predictions with the trained model
                y_pred = model.predict(X_test)
                mse = mean_squared_error(y_test, y_pred)
                r2 = r2_score(y_test, y_pred)

                # Log the metrics
                mlflow.log_metric("mse", mse)
                mlflow.log_metric("r2_score", r2)

                # Log the model
                # Create input_example to avoid warnings
                input_example = X_test[:1]
                mlflow.sklearn.log_model(
                    model, artifact_path="model", input_example=input_example)

print("Training... DONE")
