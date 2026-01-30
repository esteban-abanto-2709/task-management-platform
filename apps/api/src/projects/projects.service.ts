import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ResourceNotFoundException,
  UnauthorizedResourceException,
} from '../../common/exceptions/custom-exceptions';

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
      throw new ResourceNotFoundException('Project', id);
    }

    if (project.userId !== userId) {
      throw new UnauthorizedResourceException('project');
    }

    return project;
  }

  async update(id: string, userId: string, updateProjectDto: UpdateProjectDto) {
    // Verify that the project exists and belongs to the user
    await this.findOne(id, userId);

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: string, userId: string) {
    // Verify that the project exists and belongs to the user
    await this.findOne(id, userId);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}