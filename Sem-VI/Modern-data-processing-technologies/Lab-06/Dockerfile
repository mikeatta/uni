FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy *.py files from the current directory (copied from Lab-03)
COPY ./*.py .

# Copy the entrypoint script (conditional model creation)
COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

# Run the model training, based on specified conditions (model not found)
ENTRYPOINT ["./entrypoint.sh"]

# Start the API
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
