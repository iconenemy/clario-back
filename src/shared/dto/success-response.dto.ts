import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class SuccessResDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsBoolean()
  success: boolean;
}
