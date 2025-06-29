# Lab 04 | Modern Data Processing Technologies

## Description

In this laboratory we run the **FastAPI service** (created in the previous lab class) via **Docker**. The deployed container allows for making API requests to the FastAPI service, which communicates with the model to make predictions based on the user input.

The user may also request the information about the currently deployed model, or the service status (general health check).

## Prerequisites

- **Git** For cloning the repository.
- **Python** Version 3.9 or higher.
- **Pip** For installing the packages (usually comes pre-installed with Python).
- **Docker** Docker Engine or Docker Desktop.
- **Docker Compose** Version 2 (typically comes pre-installed with Docker Desktop). Needed for the `docker compose` command.

## Configuration

The app has been set up to require little configuration.

- **Model file** The application start point (`main.py`) expects a model file to be located at `./models/simple_v1.0.0.joblib`.
  - Running the app _locally_ might require you to run `python train.py` before starting the FastAPI service.
  - When running via _Docker_ or _Docker Compose_, the `entrypoint.sh` script has been configured to handle the necessary checks (and / or creation) of the model file.
- **API Port** The FastAPI server runs on port `8000` by default.
  - Locally, `uvicorn` binds to `localhost:8000`.
  - In Docker / Docker Compose, `uvicorn` binds to `0.0.0.0:8000` within the container, which usually maps to `localhost:8000` on the user's machine.

## Running the application

You can run the application in three different ways:

**1. Running Locally**

a. **Clone the repository and navigate to the project directory:** `git clone git@github.com:mikeatta/uni.git && cd uni/Sem-VI/Modern-data-processing-technologies/Lab-04`

b. **Create and activate a virtual environment:** `python -m venv venv`

- On macOS / Linux: `source venv/bin/activate`
- On Windows: `venv\Scripts\activate`

c. **Install dependencies:** `pip install -r requirements.txt`

d. **Create model directory:** `mkdir -p models`

e. **Run the training script (to create the model):** `python train.py`

f. **Run the FastAPI server:** `uvicorn main:app --host localhost --port 8000 --reload`

- `--reload` is optional, but useful for development

g. **Access the application:** Open your browser or use curl to access `http://localhost:8000`.

**2. Running with Docker**

a. **Clone the repository and navigate to the project directory:** `git clone git@github.com:mikeatta/uni.git && cd uni/Sem-VI/Modern-data-processing-technologies/Lab-04`

b. **Build the Docker image:** `docker build -t fastapi-service:latest .`

c. **Run the Docker container:** `docker run -p 8000:8000 fastapi-service:latest`

- Optionally use **-d** flag to run the container in detached mode

d. **Access the application:** Open your browser or use curl to access `http://localhost:8000`

e. **Stop and remove the container:** `docker stop fastapi-service`, then `docker rm fastapi-service`

**3. Running with Docker Compose**

a. **Clone the repository and navigate to the project directory:** `git clone git@github.com:mikeatta/uni.git && cd uni/Sem-VI/Modern-data-processing-technologies/Lab-04`

b. **Run Docker Compose:** `docker compose up`

- Optionally use **-d** flag to run the container in detached mode.

c. **Access the application:** Open your browser or use curl to access `http://localhost:8000`

d. **Stop services and remove containers/networks:** `docker compose down`

- Optionally use **-v** flag to automatically remove the containers / networks when stopping the service

## Available API Endpoints

- `GET /`: Returns a simple welcome message.
- `GET /health`: Returns `{"status": "ok"}`. Useful for health checks.
- `GET /info`: Returns basic information about the loaded model (type, version, parameters).
- `POST /predict`: Accepts JSON input and returns predictions.
  - **Request Body:** `{"input_data": [ <list_of_numbers> ]}`
  - **Example:** `curl -X POST -H "Content-Type: application/json" -d '{"input_data": [1.5, 2.5, 10.0]}' http://localhost:8000/predict`
  - **Response:** `{"predictions": [ <list_of_predictions> ]}`

---
