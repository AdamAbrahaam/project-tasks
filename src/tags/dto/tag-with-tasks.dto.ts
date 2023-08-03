import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from './tag.dto';
import { TaskDto } from 'src/tasks/dto';

export class TagWithTasksDto extends TagDto {
  @ApiProperty({ type: () => TaskDto, isArray: true })
  tasks: TaskDto[];
}
