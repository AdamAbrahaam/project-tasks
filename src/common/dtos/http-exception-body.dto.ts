import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  statusCode: number;
}
