import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsString, Length } from 'class-validator';

export class CreateCustomerReqDto {
  @ApiProperty({
    example: 'test@example.com',
  })
  @IsEmail()
  @Length(8, 67)
  email: string;

  @ApiProperty({
    example: 'John',
  })
  @IsAlphanumeric()
  @Length(3, 32)
  name: string;
}
