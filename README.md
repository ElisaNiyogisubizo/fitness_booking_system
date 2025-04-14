# Fitness Tracker Application

This is a full-stack fitness tracker application designed to help users manage their fitness goals. The project is built using Django for the backend, React for the frontend, and PostgreSQL as the database.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- User authentication and authorization.
- Fitness goal tracking and progress monitoring.
- Responsive frontend built with React.
- RESTful API for seamless communication between frontend and backend.
- Dockerized for easy deployment.
- Continuous Integration/Continuous Deployment (CI/CD) pipeline.

---

## Technologies Used

### Backend:
- Django
- Django REST Framework
- PostgreSQL

### Frontend:
- React
- JavaScript
- HTML/CSS

### DevOps:
- Docker
- GitHub Actions

---

## Project Structure
 ├── authentication/ # Backend authentication module ├── fitness/ # Backend fitness tracking module ├── frontend/ # React frontend ├── mainApp/ # Main Django application ├── .github/workflows/ # CI/CD pipeline configuration ├── Dockerfile # Docker configuration ├── docker-compose.yml # Docker Compose configuration ├── manage.py # Django management script └── README.md # Project documentation

---

## Setup Instructions

### Prerequisites:
- Python 3.11
- Node.js and npm
- Docker and Docker Compose

### Steps:
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>

2. Set up the backend:
```bash
cd mainApp
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install

```
4. Configure environment variables:
```sh
docker-compose up --build
```

Running the Application
Backend: The Django server will run at http://localhost:8000.
Frontend: The React app will run at http://localhost:3000.
Testing
Backend Tests:
Run the following command to execute Django tests:
```sh 
python  test
```
Frontend Tests:
Run the following command to execute React tests:

CI/CD Pipeline
This project uses GitHub Actions for CI/CD. The pipeline is defined in .github/workflows/main.yml and includes:

- Running tests on every push to the main branch.
- Building and deploying Docker images.