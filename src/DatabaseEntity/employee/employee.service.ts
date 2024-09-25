import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { user } from './../users/entities/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
  ) {}
  
  async create(createEmployeeDto: DeepPartial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto); 
    return await this.employeeRepository.save(employee);
  }
  

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findInfoUsersJoim(): Promise<Employee[]> {
    return await this.employeeRepository.find({
      relations: ['user'], // No transaction needed here as it is a read-only operation
    });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { employeeId: id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, UpdateEmployeeDto: DeepPartial<Employee>): Promise<Employee> {
    const employee = await this.employeeRepository.preload({
      employeeId: id,
      ...UpdateEmployeeDto,
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return await this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.employeeRepository.findOne({ where: { employeeId: id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    await this.employeeRepository.remove(employee);
  }
}
