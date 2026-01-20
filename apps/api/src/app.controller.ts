import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) { }

  @Get('health')
  async getHealth() {
    try {
      await this.prisma.$executeRawUnsafe('SELECT 1'); 
      return { status: 'ok', database: 'connected' };
    } catch (error) {
      console.error('Salud de DB fallida:', error);
      return { 
        status: 'error', 
        database: 'disconnected',
        message: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}
