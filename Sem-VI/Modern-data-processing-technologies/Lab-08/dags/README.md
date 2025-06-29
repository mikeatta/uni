# Lab 08 | Modern Data Processing Technologies

## Description

This lab class assignment requires us to set up `Apache Airflow` and create, run and schedule a sample DAG.

## Configuration

The default Airflow Docker file was downloaded using the following command:

`curl -LfO 'https://airflow.apache.org/docs/apache-airflow/3.0.0/docker-compose.yaml'`

The resulting file is a `docker-compose.yaml` file for the Apache Airflow containers.

## The folder structure

- **Make sure all the directories mapped as volumes exist within the directory** This step allows the docker compose to populate these directories. You can use this command to create them: `mkdir -p ./dags ./logs ./plugins ./config`
- **Set up the _dags/_ directory** Place the `retrain_model_dag.py` at the base level of the dags/ folder. Create the _dags/data/_ directory, and place the `student.csv` file inside the directory. This file placement allows the DAG to access the raw data.

---
