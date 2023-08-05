import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskWithTagsDto, UpdateTaskDto } from './dto';
import { documentation } from '../common/documentation';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':id')
  @ApiOkResponse({ type: TaskWithTagsDto })
  @ApiOperation({
    description: documentation.tasks.findOne.description,
    summary: documentation.tasks.findOne.summary,
  })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TaskWithTagsDto })
  @ApiOperation({
    description: documentation.tasks.update.description,
    summary: documentation.tasks.update.summary,
  })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({
    description: documentation.tasks.remove.description,
    summary: documentation.tasks.remove.summary,
  })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
