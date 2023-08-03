import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskState } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: TaskState })
  @IsOptional()
  @IsEnum(TaskState)
  taskState?: TaskState;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  tagId?: number;

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
