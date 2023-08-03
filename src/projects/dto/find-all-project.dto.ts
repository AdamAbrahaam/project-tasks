import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateProjectDto } from '.';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { TaskState } from '@prisma/client';

export class FindAllProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;

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
  tagId?: number;
}
