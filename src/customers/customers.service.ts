import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { user } from 'src/users/entities/user.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(user)
    private readonly userRepository : Repository<user>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto); 
    return await this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    return await this.customerRepository.findOne({ where: { customerId: id } });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { customerId: id } });
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
   
    Object.assign(customer, updateCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.customerRepository.findOne({ where: { customerId: id } });
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    await this.customerRepository.remove(customer);
  }
}
