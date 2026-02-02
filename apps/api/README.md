# 🚀 TaskFlow API

A robust REST API built with NestJS, Prisma, and PostgreSQL for managing projects and tasks with user authentication.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Error Handling](#-error-handling)
- [Docker Support](#-docker-support)
- [License](#-license)

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 👤 **User Management** - User profiles and authentication
- 📁 **Project Management** - CRUD operations for projects
- ✅ **Task Management** - CRUD operations with status workflow (OPEN → IN_PROGRESS → DONE)
- 🔒 **Authorization** - Role-based access control for resources
- ✅ **Input Validation** - Comprehensive DTO validation with class-validator
- 🚨 **Error Handling** - Consistent error responses across all endpoints
- 🗄️ **PostgreSQL** - Robust relational database with Prisma ORM
- 🐳 **Docker Ready** - Containerized deployment with Docker

## 🛠 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/) v11
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/) v7
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** class-validator & class-transformer
- **Password Hashing:** bcrypt
- **Runtime:** Node.js 20+

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.x
- **npm** >= 10.x
- **PostgreSQL** >= 14.x
- **Docker** (optional, for containerized deployment)

## 🚀 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd apps/api
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

4. **Configure your `.env` file** (see [Environment Variables](#-environment-variables))

5. **Run database migrations**

```bash
npx prisma migrate dev
```

6. **Generate Prisma Client**

```bash
npx prisma generate
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=4000

# Database Configuration (Supabase)
# Connect to Supabase via connection pooling (Transaction Pooler - Port 6543)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database (Session Pooler - Port 5432)
# Used for migrations
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"

# JWT Configuration
# ⚠️ CRITICAL: Use a strong, randomly generated secret in production
# Generate one with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### 🗄️ Database Setup (Supabase)

This project is configured to use **Supabase** as the PostgreSQL provider.

1. Create a new project on [Supabase](https://supabase.com/).
2. Go to **Project Settings** -> **Database**.
3. Under **Connection String**, select **URI**.
4. You will see two connection strings:
   - **Transaction Pooler (Port 6543):** Use this for `DATABASE_URL`. Ensure you add `?pgbouncer=true` at the end if it's not present.
   - **Session Pooler (Port 5432):** Use this for `DIRECT_URL`.
5. Update your `.env` file with these values.

### ⚠️ Security Warning

**IMPORTANT:** The application will show a warning in the console if you're using the default JWT secret:

```
⚠️  WARNING: Using default JWT_SECRET!
⚠️  Generate a secure secret with:
⚠️  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Never use the default JWT secret in production!** Generate a secure random secret using:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Required Environment Variables

| Variable       | Description                           | Required | Default               |
| -------------- | ------------------------------------- | -------- | --------------------- |
| `PORT`         | Server port                           | No       | `4000`                |
| `DATABASE_URL` | Connection pooling string (Port 6543) | **Yes**  | -                     |
| `DIRECT_URL`   | Direct connection string (Port 5432)  | **Yes**  | -                     |
| `JWT_SECRET`   | Secret key for JWT tokens             | **Yes**  | ⚠️ Default (insecure) |

### Validation

The application validates that all required environment variables are present on startup. If any are missing, the application will:

1. Log an error message indicating which variables are missing
2. Exit with a non-zero status code
3. Prevent the server from starting

## 🏃 Running the Application

### Development Mode

```bash
npm run start:dev
```

The server will start on `http://localhost:4000` with hot-reload enabled.

### Production Mode

```bash
# Build the application
npm run build

# Start the production server
npm run start:prod
```

### Docker

```bash
# Build the Docker image
docker build -t taskflow-api .

# Run the container
docker run -p 4000:4000 --env-file .env taskflow-api
```

## 📚 API Documentation

Base URL: `http://localhost:4000`

### Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

---

### 🔓 Public Endpoints

#### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe" // optional
}
```

**Response:** `201 Created`

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-01-29T10:00:00.000Z",
    "updatedAt": "2025-01-29T10:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation Rules:**

- `email`: Must be a valid email address (required)
- `password`: Minimum 6 characters (required)
- `name`: Optional string

**Error Responses:**

- `400 Bad Request` - Validation errors
- `409 Conflict` - Email already exists

---

#### Login

Authenticate and receive a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-01-29T10:00:00.000Z",
    "updatedAt": "2025-01-29T10:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Invalid credentials

---

### 🔒 Protected Endpoints

#### Get Current User

Get the authenticated user's profile.

**Endpoint:** `GET /auth/me`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2025-01-29T10:00:00.000Z",
  "updatedAt": "2025-01-29T10:00:00.000Z"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token

---

### 📁 Projects

#### Create Project

Create a new project.

**Endpoint:** `POST /projects`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "My Project",
  "description": "Project description" // optional
}
```

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "name": "My Project",
  "description": "Project description",
  "userId": "uuid",
  "createdAt": "2025-01-29T10:00:00.000Z",
  "updatedAt": "2025-01-29T10:00:00.000Z"
}
```

**Validation Rules:**

- `name`: Non-empty string (required)
- `description`: Optional string

**Error Responses:**

- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Missing or invalid token

---

#### Get All Projects

Get all projects belonging to the authenticated user.

**Endpoint:** `GET /projects`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Project 1",
    "description": "Description",
    "userId": "uuid",
    "createdAt": "2025-01-29T10:00:00.000Z",
    "updatedAt": "2025-01-29T10:00:00.000Z"
  },
  {
    "id": "uuid",
    "name": "Project 2",
    "description": null,
    "userId": "uuid",
    "createdAt": "2025-01-29T09:00:00.000Z",
    "updatedAt": "2025-01-29T09:00:00.000Z"
  }
]
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token

---

#### Get Project by ID

Get a specific project by ID.

**Endpoint:** `GET /projects/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "name": "My Project",
  "description": "Project description",
  "userId": "uuid",
  "createdAt": "2025-01-29T10:00:00.000Z",
  "updatedAt": "2025-01-29T10:00:00.000Z"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Project belongs to another user
- `404 Not Found` - Project does not exist

---

#### Update Project

Update a project.

**Endpoint:** `PATCH /projects/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "Updated Name", // optional
  "description": "Updated description" // optional
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "name": "Updated Name",
  "description": "Updated description",
  "userId": "uuid",
  "createdAt": "2025-01-29T10:00:00.000Z",
  "updatedAt": "2025-01-29T10:30:00.000Z"
}
```

**Error Responses:**

- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Project belongs to another user
- `404 Not Found` - Project does not exist

---

#### Delete Project

Delete a project and all its tasks.

**Endpoint:** `DELETE /projects/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "name": "My Project",
  "description": "Project description",
  "userId": "uuid",
  "createdAt": "2025-01-29T10:00:00.000Z",
  "updatedAt": "2025-01-29T10:00:00.000Z"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Project belongs to another user
- `404 Not Found` - Project does not exist

---

### ✅ Tasks

#### Create Task

Create a new task in a project.

**Endpoint:** `POST /tasks`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "My Task",
  "description": "Task description", // optional
  "projectId": "uuid", // required
  "status": "OPEN" // optional, default: OPEN
}
```

**Status Options:**

- `OPEN` (default)
- `IN_PROGRESS`
- `DONE`

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "title": "My Task",
  "description": "Task description",
  "status": "OPEN",
  "projectId": "uuid",
  "createdAt": "2025-01-29T10:00:00.000Z",
  "updatedAt": "2025-01-29T10:00:00.000Z",
  "project": {
    "id": "uuid",
    "name": "My Project",
    "description": "Project description",
    "userId": "uuid",
    "createdAt": "2025-01-29T09:00:00.000Z",
    "updatedAt": "2025-01-29T09:00:00.000Z"
  }
}
```

**Validation Rules:**

- `title`: Non-empty string (required)
- `description`: Optional string
- `projectId`: Valid UUID (required)
- `status`: Must be one of: `OPEN`, `IN_PROGRESS`, `DONE` (optional)

**Error Responses:**

- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Project belongs to another user
- `404 Not Found` - Project does not exist

---

#### Get All Tasks

Get all tasks belonging to the authenticated user's projects.

**Endpoint:** `GET /tasks`

**Query Parameters:**

- `projectId` (optional): Filter tasks by project ID

**Headers:**

```
Authorization: Bearer <token>
```

**Examples:**

```bash
# Get all tasks
GET /tasks

# Get tasks for a specific project
GET /tasks?projectId=uuid
```

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "title": "Task 1",
    "description": "Description",
    "status": "OPEN",
    "projectId": "uuid",
    "createdAt": "2025-01-29T10:00:00.000Z",
    "updatedAt": "2025-01-29T10:00:00.000Z",
    "project": {
      "id": "uuid",
      "name": "My Project"
    }
  },
  {
    "id": "uuid",
    "title": "Task 2",
    "description": null,
    "status": "IN_PROGRESS",
    "projectId": "uuid",
    "createdAt": "2025-01-29T09:00:00.000Z",
    "updatedAt": "2025-01-29T09:30:00.000Z",
    "project": {
      "id": "uuid",
      "name": "My Project"
    }
  }
]
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token

---

#### Get Task by ID

Get a specific task by ID.

**Endpoint:** `GET /tasks/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "title": "My Task",
  "description": "Task description",
  "status": "OPEN",
  "projectId": "uuid",
  "createdAt": "2025-01-29T10:00:00.000Z",
  "updatedAt": "2025-01-29T10:00:00.000Z",
  "project": {
    "id": "uuid",
    "name": "My Project",
    "description": "Project description",
    "userId": "uuid",
    "createdAt": "2025-01-29T09:00:00.000Z",
    "updatedAt": "2025-01-29T09:00:00.000Z"
  }
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Task belongs to another user
- `404 Not Found` - Task does not exist

---

#### Update Task

Update a task.

**Endpoint:** `PATCH /tasks/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "Updated Title", // optional
  "description": "Updated description", // optional
  "status": "IN_PROGRESS" // optional
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "title": "Updated Title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "projectId": "uuid",
  "createdAt": "2025-01-29T10:00:00.000Z",
  "updatedAt": "2025-01-29T10:30:00.000Z"
}
```

**Error Responses:**

- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Task belongs to another user
- `404 Not Found` - Task does not exist

---

#### Delete Task

Delete a task.

**Endpoint:** `DELETE /tasks/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "title": "My Task",
  "description": "Task description",
  "status": "OPEN",
  "projectId": "uuid",
  "createdAt": "2025-01-29T10:00:00.000Z",
  "updatedAt": "2025-01-29T10:00:00.000Z"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Task belongs to another user
- `404 Not Found` - Task does not exist

---

### 🏥 Health Check

#### Get Health Status

Check the API health and database connection.

**Endpoint:** `GET /health`

**Response:** `200 OK`

```json
{
  "status": "ok",
  "version": "0.0.1",
  "uptime": "3600s",
  "timestamp": "2025-01-29T10:00:00.000Z",
  "service": "TaskFlow API",
  "database": {
    "status": "connected",
    "type": "PostgreSQL"
  }
}
```

**Response (Database Error):** `503 Service Unavailable`

```json
{
  "status": "error",
  "version": "0.0.1",
  "uptime": "3600s",
  "timestamp": "2025-01-29T10:00:00.000Z",
  "service": "TaskFlow API",
  "database": {
    "status": "disconnected",
    "error": "Connection error message"
  },
  "statusCode": 503
}
```

---

## 🚨 Error Handling

All errors follow a consistent JSON response format:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "timestamp": "2025-01-29T10:30:00.000Z",
  "path": "/api/endpoint"
}
```

### HTTP Status Codes

| Code  | Description           | Use Cases                                        |
| ----- | --------------------- | ------------------------------------------------ |
| `400` | Bad Request           | Validation errors, malformed requests            |
| `401` | Unauthorized          | Missing/invalid authentication token             |
| `403` | Forbidden             | Accessing resources owned by other users         |
| `404` | Not Found             | Resource does not exist                          |
| `409` | Conflict              | Duplicate resources (e.g., email already exists) |
| `500` | Internal Server Error | Unexpected server errors                         |

### Validation Error Example

```json
{
  "statusCode": 400,
  "error": "Validation Error",
  "message": "Input validation failed",
  "details": [
    {
      "field": "email",
      "errors": ["email must be an email"]
    },
    {
      "field": "password",
      "errors": ["password must be longer than or equal to 6 characters"]
    }
  ],
  "timestamp": "2025-01-29T10:30:00.000Z",
  "path": "/auth/register"
}
```

For detailed error handling documentation, see [ERROR_HANDLING.md](docs/ERROR_HANDLING.md).

---

## 🐳 Docker Support

### Build the Docker Image

```bash
docker build -t taskflow-api .
```

### Run the Container

```bash
docker run -p 4000:4000 --env-file .env taskflow-api
```

### Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - '4000:4000'
    environment:
      - PORT=4000
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres

  postgres:
    image: postgres:16-alpine
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=taskflow
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run with Docker Compose:

```bash
docker-compose up -d
```

---

## 🧪 Testing

The `test/` directory contains HTTP test files for all endpoints:

- `auth.test.http` - Authentication endpoints
- `projects.test.http` - Project CRUD operations
- `tasks.test.http` - Task CRUD operations
- `error-handling.test.http` - Error scenarios
- `health.test.http` - Health check

### Using VS Code REST Client

1. Install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension
2. Open any `.http` file
3. Click "Send Request" above each test case

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 📝 Development Notes

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

### Prisma Studio

Open Prisma Studio to view and edit data:

```bash
npx prisma studio
```

### Code Quality

```bash
# Format code
npm run format

# Lint code
npm run lint
```

---

**Built with ❤️ using NestJS, Prisma, and PostgreSQL**
