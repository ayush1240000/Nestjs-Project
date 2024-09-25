import { IsString, IsOptional, IsPhoneNumber, IsDate, IsNotEmpty,} from 'class-validator';
import { Column } from 'typeorm';


export class CreateCustomerDto {
  
  // @IsOptional() 
  // customerId?: number;

  @Column()
  @IsNotEmpty()
  userId: number;

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
