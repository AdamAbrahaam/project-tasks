import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HttpExceptionBodyDto {
  @ApiProperty({
    oneOf: [
      { type: 'string' },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  })
  message: string | string[];

  @ApiPropertyOptional()
  error?: string;

  @ApiProperty()
  statusCode: number;
}
