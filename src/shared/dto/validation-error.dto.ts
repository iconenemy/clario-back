import { ApiProperty } from '@nestjs/swagger';

class ValidationEntity {
  @ApiProperty()
  property: string;

  @ApiProperty()
  message: string;
}

export class ValidationErrorDto {
  @ApiProperty({
    type: [ValidationEntity],
  })
  message: Array<ValidationEntity>;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}
