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
import { TagsService } from './tags.service';
import {
  CreateTagDto,
  UpdateTagDto,
  FindAllTagDto,
  TagDto,
  TagWithTasksDto,
} from './dto';
import { ApiPaginationResponse } from 'src/common/decorators';
import { documentation } from 'src/common/documentation';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiCreatedResponse({ type: TagDto })
  @ApiOperation({
    description: documentation.tags.create.description,
    summary: documentation.tags.create.summary,
  })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiPaginationResponse(TagDto)
  @ApiOperation({
    description: documentation.tags.findAll.description,
    summary: documentation.tags.findAll.summary,
  })
  findAll(@Query() query: FindAllTagDto) {
    return this.tagsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: TagWithTasksDto })
  @ApiOperation({
    description: documentation.tags.findOne.description,
    summary: documentation.tags.findOne.summary,
  })
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TagDto })
  @ApiOperation({
    description: documentation.tags.update.description,
    summary: documentation.tags.update.summary,
  })
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({
    description: documentation.tags.remove.description,
    summary: documentation.tags.remove.summary,
  })
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
