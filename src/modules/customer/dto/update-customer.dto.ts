import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateCustomerReqDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @Length(8, 67)
  email?: string;

  @ApiPropertyOptional()
  @IsAlphanumeric()
  @Length(3, 100)
  @IsOptional()
  name?: string;
}
