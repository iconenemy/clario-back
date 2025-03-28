import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsEmail,
  IsString,
  IsDateString,
  IsAlphanumeric,
} from 'class-validator';

export class FindCustomerResDto {
  @ApiProperty()
  @IsUUID()
  @IsString()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsAlphanumeric()
  name: string;

  @ApiProperty()
  @IsDateString()
  created_at: Date;

  @ApiProperty()
  @IsDateString()
  updated_at: Date;
}
