import numpy as np
import pytest
from main import app
from fastapi.testclient import TestClient
from sklearn.metrics import mean_squared_error, r2_score

# --- Load the TestClient to unit test the API endpoint responses ---

client = TestClient(app)

X_TEST_PATH = "./data/X_test.npy"
Y_TEST_PATH = "./data/y_test.npy"

# --- Fixture to load the test data ---


@pytest.fixture(scope="module")
def test_data():
    try:
        X_test = np.load(X_TEST_PATH)
        y_test = np.load(Y_TEST_PATH)
        return X_test, y_test
    except:
        pytest.fail(
            f"Test data not found. Enure '{X_TEST_PATH}' AND '{Y_TEST_PATH}' exist."
        )


# --- Test functions ---


def test_predictions_not_none(test_data):
    """
    Tests whether we receive ANY predictions as output.
    """
    # Declare an array with values ranging from 0 to 10 for testing
    X_test, _ = test_data
    sample_input = X_test[:5].flatten().tolist()
    response = client.post("/predict", json={"input_data": sample_input})
    assert response.status_code == 200

    json_response = response.json()
    assert "predictions" in json_response
    assert json_response["predictions"] is not None
    assert len(json_response["predictions"]) > 0


def test_predictions_length(test_data):
    """
    Tests whether the prediction's output array length is greater than 0,
    and has the expected amount of predictions given our input array length.
    """
    X_test, _ = test_data
    sample_input = X_test[:10].flatten().tolist()
    response = client.post("/predict", json={"input_data": sample_input})
    assert response.status_code == 200

    json_response = response.json()
    assert "predictions" in json_response
    assert len(json_response["predictions"]) == len(sample_input)


def test_predictions_value_range(test_data):
    """
    Tests whether the predictions fall within the expected value range.
    """
    X_test, _ = test_data
    input_data = X_test[:10].flatten().tolist()

    response = client.post("/predict", json={"input_data": input_data})
    assert response.status_code == 200
    predictions = response.json()["predictions"]

    MIN_EXPECTED_VALUE = -17
    MAX_EXPECTED_VALUE = 47

    all_in_range = True
    for i, p in enumerate(predictions):
        if not (MIN_EXPECTED_VALUE <= p <= MAX_EXPECTED_VALUE):
            print(f"Prediction {i} {p:.2f} falls outside of the expected threshold.")
            all_in_range = False

    assert (
        all_in_range
    ), f"One or more predictions fell outside of the range: ({MIN_EXPECTED_VALUE}, {MAX_EXPECTED_VALUE})."


def test_model_accuracy(test_data):
    """
    Tests whether the model's prediction accuracy (R2) is at an acceptable level (>= 70%).
    """
    MSE_THRESHOLD = 15.0
    R2_THRESHOLD = 0.7

    X_test, y_test = test_data
    input_data_list = X_test.flatten().tolist()

    response = client.post("/predict", json={"input_data": input_data_list})
    assert response.status_code == 200

    json_response = response.json()
    y_pred_list = json_response["predictions"]
    y_pred = np.array(y_pred_list)
    assert (
        y_test.shape == y_pred.shape
    ), f"Model prediction shape mismatch: {y_pred.shape} vs. {y_test.shape}."

    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"MSE Score: {mse:.4f}")
    print(f"R2 Score: {r2:.4f}")
    assert (
        mse <= MSE_THRESHOLD and r2 >= R2_THRESHOLD
    ), f"Unsatisfactory model performance."
