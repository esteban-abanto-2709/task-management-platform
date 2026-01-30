import { Controller, Get, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import packageJson from '../package.json';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) { }

  @Get('health')
  async getHealth() {
    const uptime = process.uptime();
    try {
      // Test database connection
      await this.prisma.$executeRawUnsafe('SELECT 1');

      return {
        status: 'ok',
        version: packageJson.version,
        uptime: `${Math.floor(uptime)}s`,
        timestamp: new Date().toISOString(),
        service: 'TaskFlow API',
        database: {
          status: 'connected',
          type: 'PostgreSQL',
        },
      };
    } catch (error) {
      return {
        status: 'error',
        version: packageJson.version,
        uptime: `${Math.floor(uptime)}s`,
        timestamp: new Date().toISOString(),
        service: 'TaskFlow API',
        database: {
          status: 'disconnected',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      };
    }
  }
}