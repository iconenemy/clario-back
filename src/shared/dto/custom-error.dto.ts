import { ApiProperty } from '@nestjs/swagger';

export class CustomErrorDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}
