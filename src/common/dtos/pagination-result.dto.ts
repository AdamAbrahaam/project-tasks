import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class PaginationResultDto<T> {
  @ApiProperty({ isArray: true })
  @IsArray()
  data: T[];

  @ApiProperty({ type: () => PaginationDto })
  pagination: PaginationDto;

  constructor(data: T[], pagination: PaginationDto) {
    this.data = data;
    this.pagination = pagination;
  }
}
