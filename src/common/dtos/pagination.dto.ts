import { ApiProperty } from '@nestjs/swagger';
import { PaginationDtoParameters } from '../interfaces';

export class PaginationDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  lastPage: number;

  constructor({ paginationOptions, totalCount }: PaginationDtoParameters) {
    this.page = paginationOptions.page;
    this.count = paginationOptions.count;
    this.totalCount = totalCount;
    this.lastPage = Math.ceil(this.totalCount / this.count);
  }
}
