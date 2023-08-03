import { ApiProperty } from '@nestjs/swagger';
import { TaskState } from '@prisma/client';

export class TaskDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: TaskState })
  state: TaskState;
}
