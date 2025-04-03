# Use official Python image
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Collect static files
RUN python manage.py collectstatic --noinput

# Use Gunicorn as WSGI server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "fitness.wsgi:application"]
