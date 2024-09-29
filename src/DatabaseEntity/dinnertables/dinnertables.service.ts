import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDinnertableDto } from './dto/create-dinnertable.dto';
import { UpdateDinnertableDto } from './dto/update-dinnertable.dto';
import { DinnerTable } from './entities/dinnertable.entity';

@Injectable()
export class DinnertablesService {
  constructor(
    @InjectRepository(DinnerTable)
    private dinnerTableRepository: Repository<DinnerTable>,
  ) {}

  // Create a new DinnerTable
  async create(createDinnertableDto: CreateDinnertableDto): Promise<DinnerTable> {
    const dinnerTable = this.dinnerTableRepository.create(createDinnertableDto);
    return await this.dinnerTableRepository.save(dinnerTable);
  }

  // Retrieve all DinnerTables
  async findAll(): Promise<DinnerTable[]> {
    return await this.dinnerTableRepository.find({ relations: ['customer', 'employee'] });
  }

  // Retrieve all DinnerTables
  async findDinnerTableByCustomer(): Promise<DinnerTable[]> {
    return await this.dinnerTableRepository.find({ relations: ['customer'] });
  }


  async findDinnerTableByCustomerid(customerId: number): Promise<{ employeeId: number, tableNo: number }> {

    const dinnerTable = await this.dinnerTableRepository.findOne({
      where: { customerId },
    });

    // Check if a dinner table is found
    if (!dinnerTable) {
      throw new Error('Dinner table not found for the given customer.');
    }

    // Return the employeeId and tableNo
    return {
      employeeId: dinnerTable.employeeId,
      tableNo: dinnerTable.tableNo,
    }
  }




  // Retrieve a specific DinnerTable by its ID
  async findOne(id: number): Promise<DinnerTable> {
    const dinnerTable = await this.dinnerTableRepository.findOne({ where: { tableNo: id }, relations: ['customer', 'employee'] });
    if (!dinnerTable) {
      throw new NotFoundException(`DinnerTable with ID ${id} not found`);
    }
    return dinnerTable;
  }

  // Update a specific DinnerTable by its ID
  async update(id: number, updateDinnertableDto: UpdateDinnertableDto): Promise<DinnerTable> {
    const dinnerTable = await this.findOne(id);
    Object.assign(dinnerTable, updateDinnertableDto);
    return this.dinnerTableRepository.save(dinnerTable);
  }

  // Remove a specific DinnerTable by its ID
  async remove(id: number): Promise<void> {
    const result = await this.dinnerTableRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`DinnerTable with ID ${id} not found`);
    }
  }
}
