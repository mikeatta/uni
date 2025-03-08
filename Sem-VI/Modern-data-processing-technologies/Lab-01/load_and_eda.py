import pandas as pd


def load_data():
    """
    Loads and returns the dataset from PATH.
    """
    return pd.read_csv("data/USA_Housing_Dataset.csv")


def test_eda(dataset):
    """
    Performs basic EDA on the dataset.
    """
    head_output = dataset.head(5)  # First 5 rows
    shape_output = dataset.shape  # Get rows x cols size

    print("-" * 30)  # Separator
    print(f"First 5 rows: {head_output}\n")
    print("-" * 30)  # Separator
    print(f"Shape: {shape_output}\n")
    print("-" * 30)  # Separator
    # Get the cols'. dtypes
    print(f"Info (column type, etc.): {dataset.info()}\n")


def main():
    """
    Main part of the script, used for executing specific parts of the exercise
    separately.
    """
    # Load the downloaded CSV dataset
    df = load_data()

    # Perform the basic EDA (load 'head' get the size, etc.)
    test_eda(df)


if __name__ == "__main__":
    main()
