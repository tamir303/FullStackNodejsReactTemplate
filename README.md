README.md Content:

# My Project

## Overview

This project is a full-stack application consisting of a frontend built with React, a backend built with Node.js, and a logging system using Logstash and Elasticsearch. The application allows users to register, log in, and manage their to-do lists.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Logging](#logging)
- [Testing](#testing)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- CRUD operations for to-do items
- Logging of API requests using Winston and Logstash
- Integration with Elasticsearch for log storage and retrieval
- Responsive frontend built with Material-UI

## Technologies

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Logging**: Winston, Logstash, Elasticsearch
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/FullStackTraining.git
   cd FullStackTraining
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Navigate to each package (`api-gateway`, `frontend`, and `backend`) and run:
   ```bash
   npm install
   ```

4. Start the application with Docker:
   ```bash
   docker-compose up
   ```

5. Access the application in your browser at `http://localhost:3000`.


## API Endpoints

### Authentication

- `POST /api/auth/register`
  - Request body: `{ "username": "string", "password": "string" }`
  
- `POST /api/auth/login`
  - Request body: `{ "username": "string", "password": "string" }`

### To-Do Management

- `POST /api/todo/create`
  - Request body: `{ "title": "string", "description": "string" }`
  
- `GET /api/todo/getAll`
  - Fetch all to-do items for the logged-in user.

- `POST /api/todo/edit`
  - Request body: `{ "title": "string", "description": "string", "complete": boolean }`
  
- `POST /api/todo/delete`
  - Request body: `{ "title": "string" }`

## Logging

The application uses Winston for logging API requests. Logs are sent to Logstash, which processes and sends them to Elasticsearch for storage. You can view the logs in Kibana at `http://localhost:5601`.
    * Kibana Username: elastic
    * Kibana Password: secret

## Testing

To run tests for the backend, navigate to the `backend` directory and run:

```bash
npm test
```

## Docker

This application uses Docker for containerization. The provided `docker-compose.yml` file orchestrates the necessary services, including MongoDB, Elasticsearch, Logstash, and the API gateway.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

GitHub Actions Workflow Content:

name: Backend Tests

on:
  push:
    branches:
      - main  # Change this to your default branch name if different
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mongo:
        image: mongo:latest
        ports:
          - 27017:27017
        env:
          MONGO_INITDB_ROOT_USERNAME: root
          MONGO_INITDB_ROOT_PASSWORD: example
        options: >-
          --health-cmd "mongo --eval 'db.adminCommand("ping")'"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    
    - name: Install dependencies
      run: npm install
      working-directory: ./backend

    - name: Run tests
      run: npm test
      working-directory: ./backend
