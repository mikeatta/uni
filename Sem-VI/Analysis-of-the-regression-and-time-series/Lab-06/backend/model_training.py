from dataset_operations import load_processed_dataset
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, recall_score, precision_score, f1_score
from catboost import CatBoostClassifier
from catboost.utils import get_gpu_device_count

MODEL_FILE_SAVE_PATH = "./model"

# --- Loading the dataset ---

# Run dataset preprocessing to obtain model-compatible data format
df = load_processed_dataset()

# --- Data prep and splitting ---

# Split the dataset into Xs and ys for training
X = df.drop(columns=["income"], axis=1)
y = df["income"]

# Split into training and testing subsets
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, stratify=y, test_size=0.3, random_state=42
)

X_test, X_val, y_test, y_val = train_test_split(
    X_temp, y_temp, stratify=y_temp, test_size=0.5, random_state=42
)

# --- Model definition and training ---

# Define extra params

# Get the class distribution ratio
ratio = (y_train == 0).sum() / (y_train == 1).sum()

# Get the categorical feature column names
cat_columns = [col for col in df.columns if df[col].dtypes == "object"]

# Get the device type (CPU or GPU)
device = "GPU" if get_gpu_device_count() > 0 else "CPU"

# Define the model
clf = CatBoostClassifier(
    depth=12,
    learning_rate=1e-1,
    iterations=250,
    scale_pos_weight=ratio,
    cat_features=cat_columns,
    task_type=device,
    devices=device,
    verbose=50,
)

# Fit the model
print("\nTraining model...")
clf.fit(X_train, y_train, eval_set=(X_val, y_val))
print("Training finished!")

# --- Model evaluation ---
print("\nEvaluating model performance...")
y_pred = clf.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
recall = recall_score(y_test, y_pred, average="binary")
precision = precision_score(y_test, y_pred, average="binary")
f1 = f1_score(y_test, y_pred, average="binary")

print("\nModel metrics")
print(f"Model accuracy: {accuracy:.6f}")
print(f"Model recall: {recall:.6f}")
print(f"Model precision: {precision:.6f}")
print(f"Model f1: {f1:.6f}")

# --- Saving the model ---
print("\nSaving trained model...")
clf.save_model(f"{MODEL_FILE_SAVE_PATH}/census_catboost_model.cbm")
print(f"Model file saved at '{MODEL_FILE_SAVE_PATH}'")
