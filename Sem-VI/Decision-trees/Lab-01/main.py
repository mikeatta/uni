import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
import time

# Dataset import
from sklearn.datasets import load_iris

data = load_iris()
X = data.data
y = data.target

# Data splitting (test / train sets)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Model training
rf = RandomForestClassifier(random_state=42)

start_time = time.time()
rf.fit(X_train, y_train)
end_time = time.time()
rfc_time = end_time - start_time

y_pred_train = rf.predict(X_train)
y_pred_test = rf.predict(X_test)

train_acc = accuracy_score(y_train, y_pred_train)
test_acc = accuracy_score(y_test, y_pred_test)

print("Accuracy (train):", train_acc)
print("Accuracy (test):", test_acc)
print("Train time (RandomForestClassifier):", rfc_time)
print("-" * 20, "\n")

# --- GridSearchCV (Hyperparameter testing) ---

# Define the GridSearch params
param_grid = {
    "n_estimators": [1, 2, 3, 5, 10],
    "max_depth": [1, 3, 5, 10, 25],
    "max_features": [1, 2, 3, 4, 10],
}

grid_search = GridSearchCV(
    estimator=rf, param_grid=param_grid, scoring="accuracy", cv=5, n_jobs=1
)

start_time = time.time()
grid_search.fit(X_train, y_train)
end_time = time.time()
grid_search_time = end_time - start_time

print("Best found params (GridSearchCV):", grid_search.best_params_)
print("Train time (GridSearchCV):", grid_search_time)
print("-" * 20, "\n")

# --- OOB score ---
rf = RandomForestClassifier(oob_score=True, random_state=42)
rf.fit(X_train, y_train)

oob_score = rf.oob_score_
print("OOB Score:", oob_score)
print("Accuracy (train:)", train_acc)
print(f"OOB Score vs. Train Accuracy: {oob_score:.3f} vs. {train_acc:.3f}")

# --- Features importance visualization ---
# Create new model with found best params out of provided test params
rf = RandomForestClassifier(
    **grid_search.best_params_, random_state=42
)  # Unpack the found best params
rf.fit(X_train, y_train)

# Get feature names and importance levels
feature_names = data.feature_names
importances = rf.feature_importances_

std = np.std([tree.feature_importances_ for tree in rf.estimators_], axis=0)

forest_importances = pd.Series(importances, index=feature_names)

fig, ax = plt.subplots()
forest_importances.plot.bar(yerr=std, ax=ax)
ax.set_title("Feature importances using MDI")
ax.set_ylabel("Mean decrease in impurity")
fig.tight_layout()
plt.show()
