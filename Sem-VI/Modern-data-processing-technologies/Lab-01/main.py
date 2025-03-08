import pandas as pd
import sklearn
import sklearn.datasets

def load_data(dataset_path="Iris"):
    """
    Loads the dataset from PATH parameter. If no parameter is given, loads the
    Iris dataset by default.
    """

    if dataset_path != "Iris":
        return pd.read_csv(dataset_path)
    
    return pd.read_csv(sklearn.datasets.load_iris())

def test_eda():
    print(123)

def main():
    """
    Main part of the script, used for executing specific parts of the exercise
    separately.
    """

    # Load the downloaded CSV dataset
    df = load_data("data/USA_Housing_Dataset.csv")

    print(df.head(5))

if __name__ == "__main__":
    main()