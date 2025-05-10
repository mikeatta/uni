import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, sum, count
from pyspark.sql.types import (
    StructType,
    StructField,
    StringType,
    IntegerType,
    DateType,
)

DATA_DIR = "./data"

# Defining the schema (type mapping of the dataset)
schema = StructType(
    [
        StructField("OrderID", IntegerType(), False),
        StructField("Product", StringType(), False),
        StructField("Category", StringType(), False),
        StructField("Price", IntegerType(), False),
        StructField("Quantity", IntegerType(), False),
        StructField("SaleDate", DateType(), False),
    ]
)

# Initialize Spark session
spark = SparkSession.builder.appName("DataFrameExample").getOrCreate()

print("Spark initialized")

csv_file_path = f"{DATA_DIR}/sample.csv"

if not os.path.exists(csv_file_path):
    raise FileNotFoundError(
        f"Sample CSV file not found at the expected location '{csv_file_path}'!"
    )
else:
    print(f"File found at {csv_file_path}.\nLoading...")

# Load the dataset
df = spark.read.csv(
    csv_file_path, header=True, schema=schema
)  # Pass the predefined schema

print("Dataset loaded.")

# --- Example data visualization ---

# Printing head
print("Showing 'df.head()':")
df.show(5)

# Printing the schema
print("Showing df schema:")
df.printSchema()

# Column selection
print("Selecting columns (Product, Category, Price):")
selected_columns_df = df.select("Product", "Category", "Price")
selected_columns_df.show(5)

# Dataset filtering
print("Filtering products which 'Price' > 100:")
filtered_columns_df = df[df["Price"] > 100]
filtered_columns_df.show(5)

# Grouping and aggregation
print("Calculate the counts and avg. price for each item category:")
category_summary_df = df.groupBy("Category").agg(
    avg("Price").alias("Average Price"),
    count("*").alias("Num. of unique products"),
    sum("Quantity").alias("Total num. of units"),
)
category_summary_df.show()

# -- Saving the processed dataframe ---
output_csv_file_path = f"{DATA_DIR}/processed_dataframe"

print(f"Saving processed dataframe to '{output_csv_file_path}'...")
category_summary_df.write.mode("overwrite").csv(output_csv_file_path, header=True)

# Also output as Parquet
output_parquet_path = f"{DATA_DIR}/processed_dataframe_parquet"
print(f"Saving processed dataframe (format: Parquet) to '{output_parquet_path}'...")
category_summary_df.write.mode("overwrite").parquet(output_parquet_path)

print("Spark operations finished.")
spark.stop()
