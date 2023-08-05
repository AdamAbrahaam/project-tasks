import { PaginationDto, PaginationResultDto } from 'src/common/dtos';

const DEFAULT_PAGE = 1;
const DEFAULT_COUNT = 5;

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
  constructor(
    protected db: Db,
    protected defaultPage: number = DEFAULT_PAGE,
    protected defaultCount: number = DEFAULT_COUNT,
  ) {}

  findFirst(data?: Args['findFirst']): Return['findFirst'] {
    return this.db.findFirst(data);
  }

  findFirstOrThrow(
    data?: Args['findFirstOrThrow'],
  ): Return['findFirstOrThrow'] {
    return this.db.findFirstOrThrow(data);
  }

  findUnique(data: Args['findUnique']): Return['findUnique'] {
    return this.db.findUnique(data);
  }

  async findMany(
    data?: Args['findMany'],
    page: number = this.defaultPage,
    count: number = this.defaultCount,
  ): Promise<Return['findMany']> {
    const skip = page > 0 ? (page - 1) * count : 0;

    const [totalCount, result] = await Promise.all([
      this.db.count({ where: (data as any)?.where }),
      this.db.findMany({
        ...(data as any),
        take: count,
        skip,
      }),
    ]);

    const paginationDto = new PaginationDto({
      totalCount: Number(totalCount),
      paginationOptions: { page, count },
    });

    return new PaginationResultDto(result as any, paginationDto);
  }

  create(data: Args['create']): Return['create'] {
    return this.db.create(data);
  }

  createMany(data: Args['createMany']): Return['createMany'] {
    return this.db.createMany(data);
  }

  update(data: Args['update']): Return['update'] {
    return this.db.update(data);
  }

  updateMany(data: Args['updateMany']): Return['updateMany'] {
    return this.db.updateMany(data);
  }

  delete(data: Args['delete']): Return['delete'] {
    return this.db.delete(data);
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
