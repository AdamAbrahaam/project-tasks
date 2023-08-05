import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateProjectDto } from '.';
import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TaskState } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({ required: false, format: 'YYYY-MM-DD' })
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiProperty({ required: false, format: 'YYYY-MM-DD' })
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  taskId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsEnum(TaskState)
  taskState?: TaskState;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  tagId?: number;

  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  page?: number;

  @ApiProperty({ required: false, default: 'Default is set in repository' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  count?: number;
}
