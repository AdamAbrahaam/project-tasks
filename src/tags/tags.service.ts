import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto, FindAllTagDto, UpdateTagDto } from './dto';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(private repository: TagsRepository) {}

  async create(dto: CreateTagDto) {
    const tag = await this.repository.create({
      data: {
        ...dto,
      },
    });

    return tag;
  }

  async findAll(query?: FindAllTagDto) {
    const tags = await this.repository.findMany({
      where: {
        name: {
          contains: query?.name,
          mode: 'insensitive',
        },
        tasks: (query?.taskId || query?.projectId || query?.taskState) && {
          some: {
            id: query?.taskId,
            projectId: query?.projectId,
            state: query?.taskState,
          },
        },
      },
    });

    return tags;
  }

  async findOne(id: number) {
    const tag = await this.repository.findFirstOrThrow({
      where: {
        id,
      },
    });

    return tag;
  }

  async update(id: number, dto: UpdateTagDto) {
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
      where: {
        id,
      },
    });
  }
}
