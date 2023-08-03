import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
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
import { ApiPaginationResponse } from 'src/common/decorators';

@Controller('projects/:projectId/tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskWithTagsDto })
  create(
    @Param('projectId') projectId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(+projectId, createTaskDto);
  }

  @Get()
  @ApiPaginationResponse(TaskDto)
  findAll(
    @Param('projectId') projectId: string,
    @Query() query: FindAllTaskDto,
  ) {
    return this.tasksService.findAll(+projectId, query);
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskWithTagsDto })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TaskWithTagsDto })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
