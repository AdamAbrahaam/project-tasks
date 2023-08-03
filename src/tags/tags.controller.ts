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
import { TagsService } from './tags.service';
import {
  CreateTagDto,
  UpdateTagDto,
  FindAllTagDto,
  TagDto,
  TagWithTasksDto,
} from './dto';
import { ApiPaginationResponse } from 'src/common/decorators';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiCreatedResponse({ type: TagDto })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiPaginationResponse(TagDto)
  findAll(@Query() query: FindAllTagDto) {
    return this.tagsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: TagWithTasksDto })
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TagDto })
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
