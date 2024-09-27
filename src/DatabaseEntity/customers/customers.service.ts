


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, EntityManager } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { user } from '../users/entities/user.entity';
import { TransactionService } from 'src/Transaction/Transaction.service';

@Injectable()
export class CustomersService {
  constructor(
    private readonly transactionService: TransactionService,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return await this.transactionService.executeTransaction(async (manager: EntityManager) => {
      const customerRepository = manager.getRepository(Customer);
      
      const customer = customerRepository.create({
        ...createCustomerDto,
        user: { userId: createCustomerDto.userId },
      });

      return await customerRepository.save(customer);
    });
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find(); // No transaction needed here as it is a read-only operation
  }

  async findInfoUsersJoim(): Promise<Customer[]> {
    return await this.customerRepository.find({
      relations: ['user'], // No transaction needed here as it is a read-only operation
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { customerId: id }, relations: ['user'] });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: DeepPartial<CreateCustomerDto>): Promise<Customer> {
    return await this.transactionService.executeTransaction(async (manager: EntityManager) => {
      const customerRepository = manager.getRepository(Customer);

      const customer = await customerRepository.preload({
        customerId: id,
        ...updateCustomerDto,
      });

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      return await customerRepository.save(customer);
    });
  }

  async remove(id: number): Promise<void> {
    await this.transactionService.executeTransaction(async (manager: EntityManager) => {
      const customerRepository = manager.getRepository(Customer);

      const customer = await customerRepository.findOne({ where: { customerId: id } });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      await customerRepository.remove(customer);
    });
  }
}
