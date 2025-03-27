import { Customer } from '@prisma/client';
import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '@core/prisma/prisma.service';

import { UpdateCustomerReqDto } from './dto/update-customer.dto';
import { CreateCustomerReqDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(private readonly prismaService: PrismaService) {}
  public async create(dto: CreateCustomerReqDto) {
    const { email } = dto;

    const customerOrder = await this.prismaService.customer
      .findFirst({
        where: { email },
      })
      .catch((error: Error) => {
        this.logger.error(`Create - ${error.message}`);
        return null;
      });

    if (customerOrder) {
      throw new ConflictException('A customer with such email already exists.');
    }

    const customerRecord = await this.prismaService.customer.create({
      data: dto,
    });

    return { message: 'The customer created successfully' };
  }

  public async findAll(): Promise<Array<Customer>> {
    return this.prismaService.customer.findMany().catch((error: Error) => {
      this.logger.error(`FindAll - ${error.message}`);
      return [];
    });
  }

  public async findOne(id: string): Promise<Customer | null> {
    return this.prismaService.customer
      .findUnique({ where: { id } })
      .catch((error: Error) => {
        this.logger.error(`FindOne - ${error.message}`);
        return null;
      });
  }

  public async update(id: string, dto: UpdateCustomerReqDto) {
    const customerOrder = await this.findOne(id);

    if (!customerOrder)
      throw new ConflictException("Such customer doesn't exist.");

    await this.prismaService.customer.update({
      where: { id },
      data: dto,
    });

    return { message: 'The customer updated successfully' };
  }

  public async remove(id: string) {
    const customerOrder = await this.findOne(id);

    if (!customerOrder)
      throw new ConflictException("Such customer doesn't exist.");

    await this.prismaService.customer.delete({ where: { id } });

    return { message: 'The customer deleted successfully' };
  }
}
