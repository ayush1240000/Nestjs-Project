import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { user } from 'src/users/entities/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly EmployeeRepository: Repository<Employee>,
    @InjectRepository(user)
    private readonly userRepository : Repository<user>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const Employee = this.EmployeeRepository.create(createEmployeeDto); 
    return await this.EmployeeRepository.save(Employee);
  }

  async findAll(): Promise<Employee[]> {
    return await this.EmployeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    return await this.EmployeeRepository.findOne({ where: { employeeId: id } });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const Employee = await this.EmployeeRepository.findOne({ where: { employeeId: id } });
    if (!Employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
   
    Object.assign(Employee, updateEmployeeDto);
    return await this.EmployeeRepository.save(Employee);
  }

  async remove(id: string): Promise<void> {
    const Employee = await this.EmployeeRepository.findOne({ where: { employeeId: id } });
    if (!Employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    await this.EmployeeRepository.remove(Employee);
  }
}
