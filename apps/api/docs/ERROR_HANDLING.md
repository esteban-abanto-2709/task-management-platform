# Error Handling Documentation

## Overview

The TaskFlow API implements a comprehensive and consistent error handling system that provides clear, actionable error messages for all API consumers.

## Error Response Format

All errors follow a standardized JSON response format:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "timestamp": "2025-01-29T10:30:00.000Z",
  "path": "/api/endpoint"
}
```

### Response Fields

- **statusCode**: HTTP status code (400, 401, 403, 404, 409, 500, etc.)
- **error**: Error type/name
- **message**: Human-readable error message (string or array for validation errors)
- **timestamp**: ISO 8601 timestamp when the error occurred
- **path**: API endpoint where the error occurred

## HTTP Status Codes

### 400 Bad Request

**Used for**: Validation errors, malformed requests

**Examples**:

- Missing required fields
- Invalid data types
- Invalid enum values
- Non-whitelisted properties in request body

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

### 401 Unauthorized

**Used for**: Authentication failures

**Examples**:

- Missing authentication token
- Invalid/expired JWT token
- Invalid login credentials

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Invalid email or password",
  "timestamp": "2025-01-29T10:30:00.000Z",
  "path": "/auth/login"
}
```

### 403 Forbidden

**Used for**: Authorization failures (authenticated but not allowed)

**Examples**:

- Accessing another user's resources
- Attempting to modify resources you don't own

```json
{
  "statusCode": 403,
  "error": "Forbidden",
  "message": "You do not have permission to access this project",
  "timestamp": "2025-01-29T10:30:00.000Z",
  "path": "/projects/abc-123"
}
```

### 404 Not Found

**Used for**: Resource not found

**Examples**:

- Invalid resource ID
- Deleted resources
- Non-existent endpoints

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Project with identifier 'abc-123' not found",
  "timestamp": "2025-01-29T10:30:00.000Z",
  "path": "/projects/abc-123"
}
```

### 409 Conflict

**Used for**: Resource conflicts

**Examples**:

- Duplicate email on registration
- Duplicate unique fields

```json
{
  "statusCode": 409,
  "error": "Conflict",
  "message": "User with this email already exists",
  "timestamp": "2025-01-29T10:30:00.000Z",
  "path": "/auth/register"
}
```

### 500 Internal Server Error

**Used for**: Unexpected server errors

**Examples**:

- Database connection failures
- Unhandled exceptions

```json
{
  "statusCode": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "timestamp": "2025-01-29T10:30:00.000Z",
  "path": "/api/endpoint"
}
```

## Custom Exceptions

The API uses custom exception classes for common error scenarios:

### ResourceNotFoundException

**Status Code**: 404  
**Usage**: When a requested resource doesn't exist

```typescript
throw new ResourceNotFoundException('Project', projectId);
// Returns: "Project with identifier 'projectId' not found"
```

### UnauthorizedResourceException

**Status Code**: 403  
**Usage**: When a user tries to access a resource they don't own

```typescript
throw new UnauthorizedResourceException('project');
// Returns: "You do not have permission to access this project"
```

### DuplicateResourceException

**Status Code**: 409  
**Usage**: When trying to create a resource with a duplicate unique field

```typescript
throw new DuplicateResourceException('User', 'email');
// Returns: "User with this email already exists"
```

### ValidationException

**Status Code**: 400  
**Usage**: For custom validation errors

```typescript
throw new ValidationException('Invalid status transition');
// Returns validation error with custom message
```

## Validation Errors

Input validation is handled automatically by `class-validator` decorators in DTOs.

### Common Validation Rules

**RegisterDto**:

- `email`: Must be a valid email address (required)
- `password`: Minimum 6 characters (required)
- `name`: Optional string

**LoginDto**:

- `email`: Must be a valid email address (required)
- `password`: Required string

**CreateProjectDto**:

- `name`: Non-empty string (required)
- `description`: Optional string

**CreateTaskDto**:

- `title`: Non-empty string (required)
- `description`: Optional string
- `projectId`: Valid UUID (required)
- `status`: Must be one of: OPEN, IN_PROGRESS, DONE (optional)

## Testing Error Scenarios

Use the provided `error-handling.test.http` file to test all error scenarios:

```bash
# Install REST Client extension in VS Code
# Open error-handling.test.http
# Click "Send Request" on any test case
```

## Best Practices for API Consumers

1. **Always check the status code** before processing the response
2. **Display error messages to users** - they are designed to be user-friendly
3. **Handle validation errors** by showing field-specific errors
4. **Implement retry logic** for 5xx errors
5. **Don't retry** 4xx errors without fixing the request
6. **Log errors** for debugging purposes

## Example Error Handling (Frontend)

```javascript
async function createProject(projectData) {
  try {
    const response = await fetch('/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });

    if (!response.ok) {
      const error = await response.json();
      
      switch (error.statusCode) {
        case 400:
          // Show validation errors
          console.error('Validation failed:', error.message);
          break;
        case 401:
          // Redirect to login
          window.location.href = '/login';
          break;
        case 403:
          // Show permission error
          alert('You don\'t have permission to do this');
          break;
        case 404:
          // Resource not found
          console.error('Resource not found:', error.message);
          break;
        case 409:
          // Duplicate resource
          console.error('Resource already exists:', error.message);
          break;
        default:
          // Server error
          console.error('Server error:', error.message);
      }
      
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
```

## Error Logging

In development mode, all errors are logged to the console with additional context:

```javascript
{
  status: 404,
  error: 'Not Found',
  message: 'Project not found',
  path: '/projects/abc-123',
  method: 'GET',
  timestamp: '2025-01-29T10:30:00.000Z'
}
```

**Note**: Detailed error logging is disabled in production to prevent sensitive information leakage.
