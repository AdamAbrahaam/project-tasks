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
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  FindAllProjectDto,
  UpdateProjectDto,
  ProjectDto,
  ProjectWithTasksDto,
} from './dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginationResponse } from '../common/decorators';
import { HttpExceptionBodyDto } from '../common/dtos';
import { documentation } from '../common/documentation';
import {
  CreateTaskDto,
  FindAllTaskDto,
  TaskDto,
  TaskWithTagsDto,
} from 'src/tasks/dto';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ProjectDto })
  @ApiOperation({
    description: documentation.projects.create.description,
    summary: documentation.projects.create.summary,
  })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiPaginationResponse(ProjectDto)
  @ApiOperation({
    description: documentation.projects.findAll.description,
    summary: documentation.projects.findAll.summary,
  })
  findAll(@Query() query?: FindAllProjectDto) {
    return this.projectsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProjectWithTasksDto })
  @ApiNotFoundResponse({ type: HttpExceptionBodyDto })
  @ApiOperation({
    description: documentation.projects.findOne.description,
    summary: documentation.projects.findOne.summary,
  })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProjectDto })
  @ApiNotFoundResponse({ type: HttpExceptionBodyDto })
  @ApiOperation({
    description: documentation.projects.update.description,
    summary: documentation.projects.update.summary,
  })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: HttpExceptionBodyDto })
  @ApiOperation({
    description: documentation.projects.remove.description,
    summary: documentation.projects.remove.summary,
  })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  @Post(':id/tasks')
  @ApiCreatedResponse({ type: TaskWithTagsDto })
  @ApiOperation({
    description: documentation.projects.createTask.description,
    summary: documentation.projects.createTask.summary,
  })
  createTask(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(+id, createTaskDto);
  }

  @Get(':id/tasks')
  @ApiPaginationResponse(TaskDto)
  @ApiOperation({
    description: documentation.projects.findAllTasks.description,
    summary: documentation.projects.findAllTasks.summary,
  })
  findAllTasks(@Param('id') id: string, @Query() query: FindAllTaskDto) {
    return this.tasksService.findAll(+id, query);
  }
}
