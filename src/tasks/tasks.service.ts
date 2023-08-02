import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private repository: TasksRepository) {}

  async create(projectId: number, dto: CreateTaskDto) {
    const tagIds = dto.tags?.map((t) => {
      return { id: t };
    });

    const task = await this.repository.create({
      data: {
        projectId,
        ...dto,
        tags: {
          connect: tagIds,
        },
      },
      include: {
        tags: true,
      },
    });

    return task;
  }

  async findAll() {
    const tasks = await this.repository.findMany();

    return tasks;
  }

  async findOne(id: number) {
    const project = await this.repository.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Incorrect ID');
    }

    return project;
  }

  async update(id: number, dto: UpdateTaskDto) {
    const tagIds = dto.tags?.map((t) => {
      return { id: t };
    });

    return this.repository.update({
      where: {
        id,
      },
      data: {
        ...dto,
        tags: {
          set: tagIds === undefined ? undefined : [],
          connect: tagIds,
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async remove(id: number) {
    await this.repository.delete({
      where: {
        id,
      },
    });
  }
}
