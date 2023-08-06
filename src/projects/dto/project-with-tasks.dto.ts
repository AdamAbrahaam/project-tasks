import { TaskDto } from '../../tasks/dto';
import { ProjectDto } from './project.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectWithTasksDto extends ProjectDto {
  @ApiProperty({ type: () => TaskDto, isArray: true })
  tasks: TaskDto[];
}
