import { NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type Operation =
  | 'findFirst'
  | 'findFirstOrThrow'
  | 'findUnique'
  | 'findMany'
  | 'create'
  | 'createMany'
  | 'update'
  | 'updateMany'
  | 'delete'
  | 'deleteMany'
  | 'count';

export abstract class DbService<
  Db extends { [Key in Operation]: (data: any) => unknown },
  Args extends { [K in Operation]: unknown },
  Return extends { [K in Operation]: unknown },
> {
  constructor(protected db: Db) {}

  findFirst(data?: Args['findFirst']): Return['findFirst'] {
    return this.db.findFirst(data);
  }

  async findFirstOrThrow(
    data?: Args['findFirstOrThrow'],
  ): Promise<Return['findFirstOrThrow']> {
    try {
      const response = await this.db.findFirstOrThrow(data);
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Record not found');
        }
      }
      throw error;
    }
  }

  findUnique(data: Args['findUnique']): Return['findUnique'] {
    return this.db.findUnique(data);
  }

  findMany(data?: Args['findMany']): Return['findMany'] {
    return this.db.findMany(data);
  }

  async create(data: Args['create']): Promise<Return['create']> {
    try {
      const response = await this.db.create(data);
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Already exists');
        }

        if (error.code === 'P2025') {
          throw new NotFoundException('Record not found');
        }
      }
      throw error;
    }
  }

  createMany(data: Args['createMany']): Return['createMany'] {
    return this.db.createMany(data);
  }

  async update(data: Args['update']): Promise<Return['update']> {
    try {
      const response = await this.db.update(data);

      return response;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Record not found');
      }
      throw error;
    }
  }

  updateMany(data: Args['updateMany']): Return['updateMany'] {
    return this.db.updateMany(data);
  }

  async delete(data: Args['delete']): Promise<Return['delete']> {
    try {
      const response = await this.db.delete(data);
      return response;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Record not found');
      }
      throw error;
    }
  }

  deleteMany(data?: Args['deleteMany']): Return['deleteMany'] {
    return this.db.deleteMany(data);
  }

  count(data?: Args['count']): Return['count'] {
    return this.db.count(data);
  }
}

export type DelegateArgs<T> = {
  [Key in keyof T]: T[Key] extends (args: infer A) => unknown ? A : never;
};

export type DelegateReturnTypes<T> = {
  [Key in keyof T]: T[Key] extends (...args: any[]) => any
    ? ReturnType<T[Key]>
    : never;
};
