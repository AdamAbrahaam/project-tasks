import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  DbService,
  DelegateArgs,
  DelegateReturnTypes,
} from 'src/common/repositories';

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
}
