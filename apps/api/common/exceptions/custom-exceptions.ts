import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for resource not found errors
 * Returns 404 status code
 */
export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, identifier?: string) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, HttpStatus.NOT_FOUND);
  }
}

/**
 * Custom exception for unauthorized access to resources
 * Returns 403 status code
 */
export class UnauthorizedResourceException extends HttpException {
  constructor(resource: string) {
    super(
      `You do not have permission to access this ${resource}`,
      HttpStatus.FORBIDDEN,
    );
  }
}

/**
 * Custom exception for validation errors
 * Returns 400 status code
 */
export class ValidationException extends HttpException {
  constructor(message: string | string[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Validation Error',
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

/**
 * Custom exception for duplicate resource errors
 * Returns 409 status code
 */
export class DuplicateResourceException extends HttpException {
  constructor(resource: string, field: string) {
    super(
      `${resource} with this ${field} already exists`,
      HttpStatus.CONFLICT,
    );
  }
}