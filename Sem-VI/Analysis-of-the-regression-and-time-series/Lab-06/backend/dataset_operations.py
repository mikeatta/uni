import os
import pandas as pd

DATASET_DIR_PATH = "./data"


def remove_duplicates(df):
    # Drop the duplicated rows
    df.drop_duplicates(inplace=True)

    # Find rows and columns containing missing data (labelled as '?')
    question_mark_mask = (
        df.astype(str).apply(lambda col: col.str.contains(r"\?", na=False)).any(axis=1)
    )

    # Remove the rows and columns with missing values
    df = df[~question_mark_mask]

    return df


def map_binary_values(df):
    """Changes categorical feature columns with two possible row values into 0s and 1s."""
    # Map the "income" column
    df["income"] = df["income"].replace({"<=50K": 0, ">50K": 1}).astype(int)

    return df


def remove_low_importance_columns(df):
    """Drops the columns with low importance metrics from the dataset."""
    return df.drop(
        columns=["education.num", "fnlwgt", "native.country", "race"], axis=1
    )


def load_processed_dataset():
    # Load the dataset
    df = None
    if os.path.exists(f"{DATASET_DIR_PATH}/adult.csv"):
        df = pd.read_csv(f"{DATASET_DIR_PATH}/adult.csv")
    else:
        FileNotFoundError(
            f"Failed to locate the dataset at {DATASET_DIR_PATH}. Please make sure the file exists within the correct directory."
        )

    # --- Dataset cleaning / processing steps ---
    df = remove_duplicates(df)
    df = map_binary_values(df)
    df = remove_low_importance_columns(df)

    # Return processed dataset
    return df
