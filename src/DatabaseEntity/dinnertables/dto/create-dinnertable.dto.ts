import { IsEnum, IsOptional, IsNumber } from 'class-validator';
import { TableStatus } from '../entities/dinnertable.entity';

export class CreateDinnertableDto {
  @IsEnum(TableStatus)
  status: TableStatus;

  @IsNumber()
  customerId: number; // Optional because the table can initially be vacant

 
  @IsNumber()
  employeeId: number; // Optional, as there may not always be an employee assigned to a table
}
