import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    // 1. Validate Project Ownership
    const project = await this.prisma.project.findUnique({
      where: { id: createTaskDto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to add tasks to this project',
      );
    }

    // 2. Create Task
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
      },
      include: {
        project: true,
      },
    });
  }

  async findAll(userId: string, projectId?: string) {
    const whereCondition: any = {
      project: {
        userId: userId,
      },
    };

    if (projectId) {
      whereCondition.projectId = projectId;
    }

    return this.prisma.task.findMany({
      where: whereCondition,
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.project.userId !== userId) {
      throw new ForbiddenException('You cannot access this task');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    // Ensure task exists and belongs to user
    await this.findOne(id, userId);

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: string, userId: string) {
    // Ensure task exists and belongs to user
    await this.findOne(id, userId);

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
