import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

import { SuccessResDto } from '@shared/dto/success-response.dto';
import { CustomApiResponse } from '@shared/decorators/success-response.decorator';

import { CustomerService } from './customer.service';
import { FindCustomerResDto } from './dto/find-customer.dto';
import { UpdateCustomerReqDto } from './dto/update-customer.dto';
import { CreateCustomerReqDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiBearerAuth('access_token')
  @CustomApiResponse(SuccessResDto, 201)
  @Post()
  public create(@Body() dto: CreateCustomerReqDto) {
    return this.customerService.create(dto);
  }

  @ApiBearerAuth('access_token')
  @CustomApiResponse([FindCustomerResDto])
  @Get()
  public findAll() {
    return this.customerService.findAll();
  }

  @ApiBearerAuth('access_token')
  @CustomApiResponse(FindCustomerResDto)
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @ApiBearerAuth('access_token')
  @CustomApiResponse(SuccessResDto)
  @Patch(':id')
  public update(@Param('id') id: string, @Body() dto: UpdateCustomerReqDto) {
    return this.customerService.update(id, dto);
  }

  @ApiBearerAuth('access_token')
  @CustomApiResponse(SuccessResDto)
  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
