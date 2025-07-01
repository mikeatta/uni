FROM python:3.11-slim

WORKDIR /app

# Copy all content from the backend directory to the container
COPY . .

# Install the dependencies from file
RUN pip install --no-cache-dir -r requirements.txt

# Prepare the entrypoint script file for execution
RUN chmod +x entrypoint.sh

EXPOSE 500
CMD ["./entrypoint.sh"]