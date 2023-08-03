import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './index';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskState } from '@prisma/client';

export class FindAllTagDto extends PartialType(CreateTagDto) {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  taskId?: number;

  @IsString()
  @IsOptional()
  @IsEnum(TaskState)
  taskState?: TaskState;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  projectId?: number;
}
