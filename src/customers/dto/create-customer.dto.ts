import { IsString, IsOptional, IsPhoneNumber, IsDate, IsUUID } from 'class-validator';


export class CreateCustomerDto {
  @IsUUID()
  @IsOptional() 
  customerId?: string;

  @IsUUID()
  userId: string;

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
