import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DbService, DelegateArgs, DelegateReturnTypes } from 'src/repositories';

type ProjectDelegate = Prisma.ProjectDelegate;

@Injectable()
export class ProjectsRepository extends DbService<
  ProjectDelegate,
  DelegateArgs<ProjectDelegate>,
  DelegateReturnTypes<ProjectDelegate>
> {
  constructor(private prisma: PrismaService) {
    super(prisma.project);
  }
}
