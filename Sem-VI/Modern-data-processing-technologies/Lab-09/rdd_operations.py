from pyspark.sql import SparkSession
import datetime
import os

DATA_DIR = "./data"

spark = SparkSession.builder.appName("RDD Example").getOrCreate()

# Get the spark context
sc = spark.sparkContext

print("Spark Context initialized")

csv_file_path = f"{DATA_DIR}/sample.csv"

if not os.path.exists(csv_file_path):
    raise FileNotFoundError(f"Could not find the sample data file at: {csv_file_path}!")
else:
    print(f"File found at {csv_file_path}.\nLoading...")

lines_rdd = sc.textFile(csv_file_path)
print(f"File loaded from RDD:\n{lines_rdd}")

# Output the first 5 lines from the RDD loaded lines
for line in lines_rdd.take(5):
    print(line)

# Remove the first line (the header)
header = lines_rdd.first()
data_rdd = lines_rdd.filter(lambda line: line != header)

# Output of the first 5 lines after removing the header
for line in data_rdd.take(5):
    print(line)

# --- Processing the RDD data ---


# Define a line-parsing function
def parse_rdd_line(line):
    """
    Takes a single line from RDD and maps the row values into the correct data types.
    """
    try:
        parts = line.split(
            ","
        )  # (For a CSV data file) Split line into column-value parts

        # OrderID [0], Product [1], Category [2], Price [3], Quantity [4], SaleDate [5]
        parts[0] = int(parts[0])
        parts[3] = int(parts[3])
        parts[4] = int(parts[4])

        # Parse the date from string
        date_parts = parts[5].split("-")
        year = int(date_parts[0])
        month = int(date_parts[1])
        day = int(date_parts[2])

        parts[5] = datetime.date(year=year, month=month, day=day)

        return parts
    except Exception as e:
        print(f"Could not parse value from line {line}. Error: {e}")
        return None


# Process the data and filter out potential missing values
parsed_rdd = data_rdd.map(parse_rdd_line).filter(lambda l: l is not None)

print("First 5 parsed rows of the RDD data:")
for line in parsed_rdd.take(5):
    print(line)

# --- RDD operations ---

# Map lines to only output OrderID, Product and Price
product_price_rdd = parsed_rdd.map(lambda row: (row[0], row[1], row[3]))
print("Showing mapped 'OrderID', 'Product' and 'Price' rows:")
for product in product_price_rdd.take(5):
    print(product)

# Filter out products, which cost more than 100
filtered_products_rdd = parsed_rdd.filter(lambda row: row[3] > 100)
print("Showing products which cost more than 100:")
for product in filtered_products_rdd.take(5):
    print(product)

# Collect the filtered products
collected_products = filtered_products_rdd.collect()
print(f"Collected products: {collected_products}")

# Total product amount
total_product_count = parsed_rdd.map(lambda row: row[4]).reduce(
    lambda total, amount: total + amount
)
print(f"Total product count: {total_product_count}")

# Count parsed data rows
product_row_count = parsed_rdd.count()
print(f"Total row count: {product_row_count}")

print("RDD operations finished.")
spark.stop()
