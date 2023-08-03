import { TaskState } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllTaskDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskState)
  taskState?: TaskState;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  tagId?: number;
}
