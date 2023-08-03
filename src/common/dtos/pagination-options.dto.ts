import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationOptionsDto {
  @ApiPropertyOptional({
    minimum: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
  })
  @IsNumber()
  @Min(1)
  @Max(50)
  @IsOptional()
  count?: number;
}
