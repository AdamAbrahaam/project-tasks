import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  DbService,
  DelegateArgs,
  DelegateReturnTypes,
} from 'src/repositories/base.repository.abstract';

type TaskDelegate = Prisma.TaskDelegate;

@Injectable()
export class TasksRepository extends DbService<
  TaskDelegate,
  DelegateArgs<TaskDelegate>,
  DelegateReturnTypes<TaskDelegate>
> {
  constructor(private prisma: PrismaService) {
    super(prisma.task);
  }

  async update(
    data: DelegateArgs<TaskDelegate>['update'],
  ): Promise<DelegateReturnTypes<TaskDelegate>['update']> {
    try {
      const updatedProject = await super.update(data);

      return updatedProject;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Incorrect ID');
      }

      if (
        error instanceof PrismaClientValidationError &&
        error.message.includes('state')
      ) {
        throw new ForbiddenException('Incorrect task state');
      }

      throw error;
    }
  }
}
