import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  FindAllTaskDto,
  TaskDto,
  TaskWithTagsDto,
  UpdateTaskDto,
} from './dto';
import { ApiPaginationResponse } from '../common/decorators';
import { documentation } from '../common/documentation';

@Controller('projects/:projectId/tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskWithTagsDto })
  @ApiOperation({
    description: documentation.tasks.create.description,
    summary: documentation.tasks.create.summary,
  })
  create(
    @Param('projectId') projectId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(+projectId, createTaskDto);
  }

  @Get()
  @ApiPaginationResponse(TaskDto)
  @ApiOperation({
    description: documentation.tasks.findAll.description,
    summary: documentation.tasks.findAll.summary,
  })
  findAll(
    @Param('projectId') projectId: string,
    @Query() query: FindAllTaskDto,
  ) {
    return this.tasksService.findAll(+projectId, query);
  }

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
