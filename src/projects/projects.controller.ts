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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginationResponse } from 'src/common/decorators';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProjectDto })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiPaginationResponse(ProjectDto)
  findAll(@Query() query?: FindAllProjectDto) {
    return this.projectsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProjectWithTasksDto })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProjectDto })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
