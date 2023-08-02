import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dto';
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

  async findAll() {
    const projects = await this.repository.findMany();

    return projects;
  }

  async findOne(id: number) {
    const project = await this.repository.findFirst({
      where: {
        id,
      },
    });

    if (!project) {
      throw new NotFoundException('Incorrect ID');
    }

    return project;
  }

  async update(id: number, dto: UpdateProjectDto) {
    return this.repository.update({
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
