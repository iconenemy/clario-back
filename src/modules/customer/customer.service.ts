import { Customer } from '@prisma/client';
import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '@core/prisma/prisma.service';

import { UpdateCustomerReqDto } from './dto/update-customer.dto';
import { CreateCustomerReqDto } from './dto/create-customer.dto';
import { FindCustomersReqDto } from './dto/find-customers.dto';

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

  public async findAll(
    query: FindCustomersReqDto,
  ): Promise<{ customers: Array<Customer>; total: number }> {
    const { page = 1, search = '', order = 'asc', sort_by = 'id' } = query;

    const take = 10;
    const skip = (page - 1) * take;

    const orderBy = {
      [sort_by]: order === 'asc' ? 'asc' : 'desc',
    };

    const [customers, total] = await Promise.all([
      this.prismaService.customer
        .findMany({
          where: {
            email: {
              startsWith: search,
              mode: 'insensitive',
            },
          },
          take,
          skip,
          orderBy,
        })
        .catch((error: Error) => {
          this.logger.error(`FindAll - ${error.message}`);
          return [];
        }),
      this.prismaService.customer.count({
        where: {
          email: {
            startsWith: search,
          },
        },
      }),
    ]);

    return { customers, total };
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
    const { email } = dto;

    const [customerCandidate, customerOrder] = await Promise.all([
      this.findOne(id),
      this.prismaService.customer.findUnique({ where: { email } }),
    ]);

    if (!customerCandidate)
      throw new ConflictException("Such customer doesn't exist.");

    if (customerOrder && customerOrder.email !== customerCandidate.email)
      throw new ConflictException('A customer with such email already exists.');

    await this.prismaService.customer.update({
      where: { id },
      data: dto,
    });

    return { message: 'The customer updated successfully' };
  }

  public async remove(id: string) {
    this.logger.log('Remove customer');

    const customerOrder = await this.findOne(id);

    if (!customerOrder)
      throw new ConflictException("Such customer doesn't exist.");

    await this.prismaService.customer.delete({ where: { id } });

    return { message: 'The customer deleted successfully' };
  }
}
