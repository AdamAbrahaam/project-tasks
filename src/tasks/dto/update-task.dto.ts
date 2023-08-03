import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { PartialType } from '@nestjs/mapped-types';
import { TaskState } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({ enum: TaskState })
  @IsOptional()
  @Transform(({ value }) => {
    return TaskState[value];
  })
  state?: TaskState;
}
