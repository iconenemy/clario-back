import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { FindCustomerResDto } from './find-customer.dto';

type Order = 'asc' | 'desc';

export class FindCustomersReqDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  page: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sort_by: string;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order: Order;
}

export class FindCustomersResDto {
  @ApiProperty({ type: [FindCustomerResDto] })
  customers: Array<FindCustomerResDto>;

  @ApiProperty()
  total: number;
}
