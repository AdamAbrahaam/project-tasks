import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './index';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskState } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllTagDto extends PartialType(CreateTagDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  taskId?: number;

  @ApiPropertyOptional({ enum: TaskState })
  @IsString()
  @IsOptional()
  @IsEnum(TaskState)
  taskState?: TaskState;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  projectId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  page: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  count: number;
}
