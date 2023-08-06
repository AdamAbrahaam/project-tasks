import { Injectable } from '@nestjs/common';
import { CreateProjectDto, FindAllProjectDto, UpdateProjectDto } from './dto';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private repository: ProjectsRepository) {}

  async create(dto: CreateProjectDto) {
    const project = await this.repository.create({
      data: { ...dto },
    });

    return project;
  }

  async findAll(query?: FindAllProjectDto) {
    const projects = await this.repository.findMany(
      {
        where: {
          name: {
            contains: query?.name,
            mode: 'insensitive',
          },
          description: {
            contains: query?.description,
            mode: 'insensitive',
          },
          createdAt: {
            lte: query?.dateTo
              ? new Date(query.dateTo).toISOString()
              : undefined,
            gte: query?.dateTo
              ? new Date(query.dateFrom).toISOString()
              : undefined,
          },
          tasks: (query?.taskId || query?.taskState || query?.tagId) && {
            some: {
              id: query?.taskId,
              state: query?.taskState,
              tags: {
                some: query?.tagId && {
                  id: query?.tagId,
                },
              },
            },
          },
        },
      },
      query?.page,
      query?.count,
    );

    return projects;
  }

  async findOne(id: number) {
    const project = await this.repository.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });

    return project;
  }

  async update(id: number, dto: UpdateProjectDto) {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    await this.repository.delete({
      where: { id },
    });
  }
}
