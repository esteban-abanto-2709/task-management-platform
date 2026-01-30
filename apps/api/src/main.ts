import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Global exception filter for consistent error responses
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global validation pipe for DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties not defined in DTO
      forbidNonWhitelisted: true, // Throw error if extra properties exist
      transform: true, // Transform payloads to DTO instances
      // Return detailed validation errors
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));
        return {
          statusCode: 400,
          error: 'Validation Error',
          message: 'Input validation failed',
          details: messages,
        };
      },
    }),
  );

  const port = process.env.PORT ?? 4000;

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}/health`);
}

bootstrap();
