from pyspark.sql import SparkSession
from pyspark.sql.functions import row_number, lit, expr, desc
from pyspark.sql.window import Window
import os

DATA_DIR = "./data"

# --- Loading the data ---

parquet_file_path = os.path.join(DATA_DIR, "processed_dataframe_parquet")
csv_file_path = os.path.join(DATA_DIR, "processed_dataframe")

spark = SparkSession.builder.appName("SparkAnalysis").getOrCreate()

# Load the prepared dataset
if not os.path.exists(parquet_file_path):
    raise FileNotFoundError(
        f"Could not find the Parquet dataset at {parquet_file_path}!"
    )
else:
    print("Parquet dataset file located!\nLoading...")

# Loads the Parquet export from the last laboratory class
df = spark.read.parquet(parquet_file_path)

print("Showing the first few rows of the dataset:")
df.show()

print("Showing the dataset structure:")
df.printSchema()

# --- Loading the CSV dataset ---

df_csv = spark.read.csv(csv_file_path, header=True, inferSchema=True)

# Creating a temporary view
df_csv.createOrReplaceTempView("CSV_Dataset")

print("Example SQL query result from the created TempView:")
result = spark.sql(
    "SELECT Category, `Number of Products` FROM CSV_Dataset WHERE Category = 'Electronics'"
)
result.show()

# --- Load the more expansive CSV datasets ---

# Overwrite old CSV file path
csv_file_path = os.path.join(
    DATA_DIR, "student.csv"
)  # Students dataset from Lab 08 (Kaggle)

if not os.path.exists(csv_file_path):
    raise FileNotFoundError(f"Could not find the Student dataset at {csv_file_path}!")
else:
    print("Student dataset file located!\nLoading...")

df_csv = spark.read.csv(csv_file_path, header=True, inferSchema=True)

# Drop the index column which is missing the header name
if "_c0" in df_csv.columns:
    df_csv = df_csv.drop("_c0")

df_csv.createOrReplaceTempView("Students")
df_csv.show(5)

# --- Run SQL queries on the dataset ---

# Count students using Private transportation / traveling by bus (group + aggregate)
print("Students' means of transportation:")
student_means_of_transport_counts = spark.sql(
    "SELECT Transportation, COUNT(*) as Count FROM Students GROUP BY Transportation"
)
student_means_of_transport_counts.show()

# Filter student who study more than 10 hours per week
print("Students who study 10+ hours weekly:")
student_study_hours_above_ten = spark.sql(
    "SELECT * FROM Students WHERE Weekly_Study_Hours >= 10 ORDER BY Grade ASC"
)
student_study_hours_above_ten.show(5)

# JOIN statement -- load and join the set
joined_csv_path = os.path.join(DATA_DIR, "student_generated.csv")

if not os.path.exists(joined_csv_path):
    raise FileNotFoundError(
        f"Could not find the Generated Student dataset at {joined_csv_path}!"
    )
else:
    print("Generated Student dataset file located!\nLoading...")

df_csv_join = spark.read.csv(joined_csv_path, header=True, inferSchema=True)

# Get the last ID value from the first set
last_df_csv_id = df_csv.agg({"Id": "max"}).collect()[0][0]

window_spec = Window.partitionBy(lit(1)).orderBy(lit(1))

# Rowcount a temp rowcount column to store the row's order number
df_csv_join_temp_rowcount = df_csv_join.withColumn(
    "rowcount", row_number().over(window_spec)
)

# Add the rowcount value to the max ID from the first CSV set
# This increments the ID, starting from the last ID from first dataframe
df_csv_join_updated = df_csv_join_temp_rowcount.withColumn(
    "Id", expr(f"{last_df_csv_id} + rowcount")
).drop("rowcount")

# Join the numbered dataframes
print("Showing joined datasets:")
df_combined = df_csv.unionByName(df_csv_join_updated)
df_combined.orderBy(desc("Id")).show(5)

# Define the expected last ID after the JOIN operation
df_combined_expected_last_id = last_df_csv_id + df_csv_join_updated.count()
print(f"Expected new last ID: {df_combined_expected_last_id}")

df_combined_actual_last_id = df_combined.agg({"Id": "max"}).collect()[0][0]
print(f"Actual last ID: {df_combined_actual_last_id}")
print(
    f"JOIN Operation result as expected?: {df_combined_expected_last_id == df_combined_actual_last_id}"
)

# --- Saving the processed dataset ---

# Save the dataframe
output_csv_file_path = os.path.join(DATA_DIR, "joined_dataframes")
print(f"Saving processed dataframe to '{output_csv_file_path}'...")
df_combined.write.mode("overwrite").csv(output_csv_file_path, header=True)

# Load the dataframe (test)
if not os.path.exists(output_csv_file_path):
    raise FileNotFoundError(
        f"Could not find the exported dataset at {output_csv_file_path}!"
    )
else:
    print("Exported dataset file located!\nLoading...")

df_loaded = spark.read.csv(output_csv_file_path, header=True, inferSchema=True)

print("Showing first rows:")
df_loaded.show(5)

print("Showing loaded schema:")
df_loaded.printSchema()

print("Operations finished.\nStopping...")
spark.stop()
