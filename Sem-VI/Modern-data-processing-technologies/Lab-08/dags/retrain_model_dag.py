import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import datetime as dt
import joblib
import os
import logging
import shutil

# --- Airflow Imports ---
from airflow.models.dag import DAG
from airflow.operators.python import PythonOperator

logging.basicConfig(level=logging.INFO)

# --- Config ---
BASE_DIR = "/opt/airflow/dags"
DATA_FOLDER = os.path.join(BASE_DIR, "data")
MODELS_FOLDER = os.path.join(BASE_DIR, "models")
PRODUCTION_FOLDER = os.path.join(MODELS_FOLDER, "production")
RAW_DATA_PATH = os.path.join(DATA_FOLDER, "student.csv")

# Define paths for the processed data
X_TRAIN_PATH = os.path.join(DATA_FOLDER, "X_train.pkl")
X_TEST_PATH = os.path.join(DATA_FOLDER, "X_test.pkl")
Y_TRAIN_PATH = os.path.join(DATA_FOLDER, "y_train.pkl")
Y_TEST_PATH = os.path.join(DATA_FOLDER, "y_test.pkl")

PRODUCTION_MODEL_PATH = os.path.join(PRODUCTION_FOLDER, "active_model.joblib")


def prepare_or_load_train_data():
    """
    Loads and splits the Kaggle sample dataset into a training and testing set.
    """
    processed_data_exists = all(
        [
            os.path.exists(X_TRAIN_PATH),
            os.path.exists(X_TEST_PATH),
            os.path.exists(Y_TRAIN_PATH),
            os.path.exists(Y_TEST_PATH),
        ]
    )

    # Ensure data directory exists
    os.makedirs(DATA_FOLDER, exist_ok=True)

    if processed_data_exists:
        logging.info("Loading processed data...")
        X_train = pd.read_pickle(X_TRAIN_PATH)
        X_test = pd.read_pickle(X_TEST_PATH)
        y_train = pd.read_pickle(Y_TRAIN_PATH)
        y_test = pd.read_pickle(Y_TEST_PATH)
        logging.info("Loaded processed data successfully.")
    else:
        logging.info("Processed data not found. Creating from raw dataset...")
        # Check if the actual imported CSV dataset exists within the directory
        if not os.path.exists(RAW_DATA_PATH):
            logging.error(f"Raw data file not found at: {RAW_DATA_PATH}")
            raise FileNotFoundError(f"Raw data file not found at: {RAW_DATA_PATH}")

        # Load the dataset as a DataFrame
        df = pd.read_csv(RAW_DATA_PATH)
        df.dropna(
            axis=0, how="any", inplace=True
        )  # Removes the single Na value from the dataset

        # Convert to numerical values
        object_cols = df.select_dtypes(include="object").columns
        categorical_cols_to_encode = [col for col in object_cols if col != "Grade"]
        if len(categorical_cols_to_encode):
            logging.info(
                f"Applying one-hot encoding to: {list(categorical_cols_to_encode)}"
            )
            df = pd.get_dummies(df, columns=categorical_cols_to_encode, drop_first=True)

        # Map the "Grade" column values
        grade_mapping = {
            "Fail": 0,
            "DD": 1,
            "DC": 2,
            "CC": 3,
            "CB": 4,
            "BB": 5,
            "BA": 6,
            "AA": 8,
        }

        df["Grade"] = df["Grade"].map(grade_mapping)

        # Split into X (features), and y (target)
        X = df.drop("Grade", axis=1)
        y = df["Grade"]

        # Split Xs, and ys into training / testing data (80% / 20% split)
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Save the data for future use
        logging.info("Saving processed data...")
        X_train.to_pickle(X_TRAIN_PATH)
        X_test.to_pickle(X_TEST_PATH)
        y_train.to_pickle(Y_TRAIN_PATH)
        y_test.to_pickle(Y_TEST_PATH)
        logging.info("Saved processed data successfully.")

    return X_train, X_test, y_train, y_test


def get_model_performance_metrics(model, X_test, y_test):
    """
    Calculates the model performance.
    """
    try:
        y_pred = model.predict(X_test)

        # Adjust the average for multiclass classification
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, average="weighted")
        recall = recall_score(y_test, y_pred, average="weighted")
        f1 = f1_score(y_test, y_pred, average="weighted")

        return accuracy, precision, recall, f1
    except Exception as e:
        logging.error(f"Error calculating model metrics: {e}")
        return 0.0, 0.0, 0.0, 0.0


def retrain_model(**kwargs):
    os.makedirs(MODELS_FOLDER, exist_ok=True)
    os.makedirs(PRODUCTION_FOLDER, exist_ok=True)

    X_train, X_test, y_train, y_test = prepare_or_load_train_data()

    logging.info("Training new model...")
    clf_new = RandomForestClassifier(random_state=42)
    clf_new.fit(X_train, y_train)
    logging.info("New model trained.")

    logging.info("Evaluating new model...")
    accuracy_new, _, _, f1_new = get_model_performance_metrics(clf_new, X_test, y_test)

    accuracy_old, f1_old = 0.0, 0.0
    clf_old = None
    if os.path.exists(PRODUCTION_MODEL_PATH):
        try:
            logging.info(f"Loading production model from {PRODUCTION_MODEL_PATH}")
            clf_old = joblib.load(PRODUCTION_MODEL_PATH)
            logging.info("Evaluating production model...")
            accuracy_old, _, _, f1_old = get_model_performance_metrics(
                clf_old, X_test, y_test
            )
        except Exception as e:
            logging.error(
                f"Failed to load or evaluate production model: {e}. Treating as 0 performance."
            )
            accuracy_old, f1_old = 0.0, 0.0
    else:
        logging.info("No production model found.")

    # Compare the old vs. new model performance
    logging.info(
        f"Comparison: New Accuracy={accuracy_new:.4f} vs Production Accuracy={accuracy_old:.4f}"
    )
    deploy_new_model = (accuracy_new > accuracy_old) & (f1_new > f1_old)

    # Archive the new model and version it using a timestamp
    timestamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    archived_model_path = os.path.join(MODELS_FOLDER, f"clf_model_{timestamp}.joblib")
    logging.info(f"Saving newly trained model to {archived_model_path}")
    joblib.dump(clf_new, archived_model_path)

    # Copy new model file to production
    if deploy_new_model:
        logging.info(
            "New model scored higher evaluation metrics. Deploying to production..."
        )
        try:
            shutil.copyfile(archived_model_path, PRODUCTION_MODEL_PATH)
            logging.info(
                f"Successfully copied {archived_model_path} to {PRODUCTION_MODEL_PATH}"
            )
            return PRODUCTION_MODEL_PATH
        except Exception as e:
            logging.error(f"Failed to copy model to production: {e}")
            return archived_model_path
    else:
        logging.info("New model is not better than production model. Not deploying.")
        return archived_model_path


# --- Airflow DAG Definition ---
default_args = {
    "owner": "airflow",
    "depends_on_past": False,
    "email_on_failure": False,
    "email_on_retry": False,
    "retries": 1,
    "retry_delay": dt.timedelta(minutes=5),
    "start_date": dt.datetime(2025, 5, 4, tzinfo=dt.timezone.utc),  # Start yesterday
}

# Instantiate the DAG
with DAG(
    dag_id="model_retraining_dag",
    default_args=default_args,
    description="DAG for automatically retraining the classification model",
    schedule="@daily",
    catchup=False,
    tags=["ml", "retraining", "lab", "uni"],
) as dag:

    # Define the task using PythonOperator
    retrain_task = PythonOperator(
        task_id="retrain_and_evaluate_model",
        python_callable=retrain_model,
    )

# For running and testing locally
if __name__ == "__main__":
    os.makedirs("data", exist_ok=True)
    os.makedirs("models/production", exist_ok=True)

    dummy_csv_path = "data/student.csv"
    if not os.path.exists(dummy_csv_path):
        print(f"Dataset not found. Expected path {dummy_csv_path}")

    BASE_DIR = "."

    DATA_FOLDER = os.path.join(BASE_DIR, "data")
    MODELS_FOLDER = os.path.join(BASE_DIR, "models")
    PRODUCTION_FOLDER = os.path.join(MODELS_FOLDER, "production")
    RAW_DATA_PATH = os.path.join(DATA_FOLDER, "student.csv")
    X_TRAIN_PATH = os.path.join(DATA_FOLDER, "X_train.pkl")
    X_TEST_PATH = os.path.join(DATA_FOLDER, "X_test.pkl")
    Y_TRAIN_PATH = os.path.join(DATA_FOLDER, "y_train.pkl")
    Y_TEST_PATH = os.path.join(DATA_FOLDER, "y_test.pkl")
    PRODUCTION_MODEL_PATH = os.path.join(PRODUCTION_FOLDER, "active_model.joblib")

    print("--- Running retrain_model locally ---")
    result_path = retrain_model()
    print(f"--- retrain_model finished. Result path: {result_path} ---")

    # Run again to test data loading and model comparison
    print("\n--- Running retrain_model again (testing cache and comparison) ---")
    result_path_2 = retrain_model()
    print(f"--- retrain_model finished again. Result path: {result_path_2} ---")
