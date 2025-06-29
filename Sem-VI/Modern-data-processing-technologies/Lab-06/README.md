# Lab 06 | Modern Data Processing Technologies

## Description

In this laboratory we create a `CI/CD pipeline` for the FastAPI model prediction app we had built in the previous classes.

## Configuration

The pipeline was set up to generate the necessary test data for the model's predictions and test the endpoint's accessibility. During the tests, we evaluate the model's performance, and we make sure that predictions are being properly returned from the endpoint calls and that they contain the expected prediction data.

### Pipeline workflow

- **Run training script** The first step in the pipeline is to generate the test dataset for the model. We do this by running `train.py`
- **Run pytest** The next step is to run `pytest` in order to check if the data was generated correctly, and if the endpoints are working as expected
- **Build and push the Docker container** The final step in the pipeline is to build the Docker container and push it to `Docker Hub`

---
