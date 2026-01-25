import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.userId !== userId) {
      throw new ForbiddenException('You do not have access to this project');
    }

    return project;
  }

  async update(id: string, userId: string, updateProjectDto: UpdateProjectDto) {
    // Verificar que el proyecto existe y pertenece al usuario
    await this.findOne(id, userId);

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: string, userId: string) {
    // Verificar que el proyecto existe y pertenece al usuario
    await this.findOne(id, userId);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}