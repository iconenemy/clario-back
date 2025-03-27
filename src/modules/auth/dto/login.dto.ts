import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsAlphanumeric } from 'class-validator';

export class LoginReqDto {
  @ApiProperty({
    example: 'admin@example.com',
  })
  @IsEmail()
  @Length(8, 67)
  email: string;

  @ApiProperty({
    example: 'securepass',
  })
  @IsAlphanumeric()
  @Length(8, 32)
  password: string;
}

export class LoginResDto {
  @ApiProperty()
  access_token: string;
}
