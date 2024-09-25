import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateEmployeeDto {
  
    @Column()
  @IsNotEmpty() // Ensure that userId is required
   // Ensure that userId is a number
  userId: number;

  @IsNotEmpty() // Ensure that role is required
  @IsString() // Ensure that role is a string
  role: string;

  @IsNotEmpty() // Ensure that Salaryamount is required
  @IsNumber() // Ensure that Salaryamount is a number
  Salaryamount: number;

  @IsDate()
  @IsOptional() // Optional, as it may be auto-generated
  deletedAt?: Date;

  @IsDate()
  @IsOptional() // Optional, as it may be auto-generated
  createdAt?: Date;

  @IsDate()
  @IsOptional() // Optional, as it may be auto-generated
  updatedAt?: Date;
}
