import joblib
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error, r2_score

# --- Load the exported model and scaler ---

try:
    model = joblib.load("model.joblib")
    scaler = joblib.load("scaler.joblib")
except FileNotFoundError:
    print("Error: Model or scaler not found in current directory.")
    exit()

try:
    # Also load the data sample
    X_train_sample = pd.read_csv("X_train_sample.csv")
except FileNotFoundError:
    print("Error: X_train_sample.csv not found.")
    exit()

print(X_train_sample.columns)

column_names = X_train_sample.columns.tolist()

# Create a new random, sample dataset (single row, with cols. form earlier, for evaluation purposes)
new_data_df = pd.DataFrame(columns=column_names)
new_data = {}

for col in column_names:
    if col.startswith(("street_", "city_", "statezip_")):
        pass  # Do nothing yet, add values later

    elif X_train_sample[col].dtype in ['int64', 'float64']:
        mean = X_train_sample[col].mean()
        std = X_train_sample[col].std()
        new_data[col] = np.random.normal(loc=mean, scale=std)

        # Constraints
        if col in ['bedrooms', 'bathrooms', 'floors']:
            new_data[col] = max(1, int(round(new_data[col])))
        elif col in ['sqft_living', 'sqft_lot', 'sqft_above', 'sqft_basement']:
            new_data[col] = max(0, int(round(new_data[col])))
        elif col in ['year', 'yr_built', 'yr_renovated']:
            new_data[col] = max(1900, min(2025, int(round(new_data[col]))))
        elif col == "condition":
            new_data[col] = np.random.choice(range(1, 6))
        elif col in ["view", "waterfront"]:
            new_data[col] = np.random.choice([0, 1])
        elif col in ['month']:
            new_data[col] = np.random.choice(range(1, 13))
        elif col in ['day_of_week']:
            new_data[col] = np.random.choice(range(7))
        else:
            print(f"Warning: Unhandled column type for {col}")
            new_data[col] = 0

    else:
        # Fallback for any non-numeric and non one-hot encoded column
        new_data[col] = 0

# --- One-Hot encoding (skipped before) ---

for prefix in ["street_", "city_", "statezip_"]:
    # Get the relevant columns for this group.
    group_cols = [col for col in column_names if col.startswith(prefix)]

    # Randomly choose one column from this group to set to 1
    chosen_col = np.random.choice(group_cols)

    # Set the chosen column to 1, and the rest to 0
    for col in group_cols:
        if col == chosen_col:
            new_data[col] = 1
        else:
            new_data[col] = 0

# Add the prepared data to the (previously empty) df
new_data_df = pd.concat(
    [new_data_df, pd.DataFrame([new_data])], ignore_index=True)

print(new_data_df)

# --- Scale the data and predict on new data ---

new_data_scaled = scaler.transform(new_data_df)
# The actual predicted value, based on the generated row
predictions = model.predict(new_data_scaled)
print(predictions)

# --- Evaluate the saved model ---
try:
    test_df = pd.read_csv("data/USA_Housing_Dataset.csv")

    test_df["date"] = pd.to_datetime(test_df["date"])
    test_df["year"] = test_df["date"].dt.year
    test_df["month"] = test_df["date"].dt.month
    test_df["day_of_week"] = test_df["date"].dt.day_of_week
    test_df.drop("date", axis=1, inplace=True)

    def reduce_categories(df, column, top_n):
        """
        Reduces the categories to 'Other' or top N.
        """
        top_categories = df[column].value_counts().nlargest(top_n).index
        df[column] = df[column].apply(
            lambda x: x if x in top_categories else "Other")
        return df

    test_df = reduce_categories(test_df, "street", 5)
    test_df = reduce_categories(test_df, "city", 5)
    test_df.drop("country", axis=1, inplace=True)

    test_df = pd.get_dummies(
        test_df, columns=["street", "city", "statezip"], drop_first=True)

    # Define X and y for evaluation
    y_test_eval = test_df["price"]
    X_test_eval = test_df.drop("price", axis=1)

    # Check for any missing columns
    missing_cols_test = set(X_train_sample.columns) - set(X_test_eval.columns)
    if missing_cols_test:
        for col in missing_cols_test:
            X_test_eval[col] = 0

    # Check for any extra columns
    extra_cols_test = set(X_test_eval.columns) - set(X_train_sample.columns)
    if extra_cols_test:
        X_test_eval.drop(columns=extra_cols_test, inplace=True)

    X_test_eval = X_test_eval[X_train_sample.columns]

    # Scale with imported scaler
    X_test_eval_scaled = scaler.transform(X_test_eval)

    # Predict and Evaluate
    y_pred_eval = model.predict(X_test_eval_scaled)

    print(
        f"Mean Squared Error (Evaluation): {mean_squared_error(y_test_eval, y_pred_eval)}")
    print(f"R^2 Score (Evaluation): {r2_score(y_test_eval, y_pred_eval)}")

except FileNotFoundError:
    print("Could not load original test data for evaluation. Skipping.")
