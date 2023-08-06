import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  DbService,
  DelegateArgs,
  DelegateReturnTypes,
} from '../common/repositories';

type TagDelegate = Prisma.TagDelegate;

@Injectable()
export class TagsRepository extends DbService<
  TagDelegate,
  DelegateArgs<TagDelegate>,
  DelegateReturnTypes<TagDelegate>
> {
  constructor(private prisma: PrismaService) {
    super(prisma.tag);
  }
}
