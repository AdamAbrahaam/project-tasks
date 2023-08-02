import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto } from './dto';
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

  async findAll(name?: string) {
    const tags = await this.repository.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        tasks: true,
      },
    });

    return tags;
  }

  async findOne(id: number) {
    const tag = await this.repository.findFirst({
      where: {
        id,
      },
    });

    if (!tag) {
      throw new NotFoundException('Incorrect ID');
    }

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
