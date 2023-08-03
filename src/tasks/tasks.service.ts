import { Injectable } from '@nestjs/common';
import { CreateTaskDto, FindAllTaskDto, UpdateTaskDto } from './dto';
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

  async findAll(projectId: number, query?: FindAllTaskDto) {
    const tasks = await this.repository.findMany(
      {
        where: {
          projectId,
          description: {
            contains: query?.description,
            mode: 'insensitive',
          },
          state: {
            equals: query?.taskState,
          },
          tags: query?.tagId && {
            some: {
              id: query.tagId,
            },
          },
        },
      },
      query?.page,
      query?.count,
    );

    return tasks;
  }

  async findOne(id: number) {
    const project = await this.repository.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });

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
