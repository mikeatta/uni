import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import joblib

# Load the dataset
df = pd.read_csv("data/USA_Housing_Dataset.csv")

# --- Cleaning and Preprocessing the dataset ---

print(df.isnull().sum(), df.columns, df["street"].value_counts(
), df["city"].value_counts(), df["statezip"].value_counts())

# No missing values

# Convert the dates to pd format
df["date"] = pd.to_datetime(df["date"])
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day_of_week"] = df["date"].dt.day_of_week
df.drop("date", axis=1, inplace=True)


def reduce_categories(df, column, top_n):
    """
    Reduces the categories to either one of the top categories, or 'Other'.
    """
    top_categories = df[column].value_counts().nlargest(top_n).index
    df[column] = df[column].apply(
        lambda x: x if x in top_categories else "Other")
    return df


top_n_streets = 5
top_n_cities = 5

df = reduce_categories(df, "street", top_n_streets)
df = reduce_categories(df, "city", top_n_cities)
df.drop("country", axis=1, inplace=True)  # Drop "country" -- it's USA data

# One-hot encode the remaining data (convert values to numeric, since we're testing linear regression)
df = pd.get_dummies(
    df, columns=["street", "city", "statezip"], drop_first=True)

# --- Splitting data into training, and testing set ---

# Define the target, and the features
y = df["price"]
X = df.drop("price", axis=1)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Save the features to extract the preprocessed columns to another file
X_train.to_csv("X_train_sample.csv", index=False)

# Scale the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# --- Training the model ---

model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Making model predictions
y_pred = model.predict(X_test_scaled)

# Evaluating model performance (mse, r^2)
print("-" * 30)
print(f"Mean Squared Error: {mean_squared_error(y_test, y_pred)}")
print(f"R^2 Score: {r2_score(y_test, y_pred)}\n")

# --- Exporting the model ---

joblib.dump(model, "model.joblib")

# Also export the scaler
joblib.dump(scaler, "scaler.joblib")
