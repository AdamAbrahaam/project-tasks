import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from '../../tags/dto';
import { TaskDto } from './task.dto';

export class TaskWithTagsDto extends TaskDto {
  @ApiProperty({ type: () => TagDto, isArray: true })
  tags: TagDto[];
}
