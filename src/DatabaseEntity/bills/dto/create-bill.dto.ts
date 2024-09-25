// import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';

// export class CreateBillDto {
//   @IsInt()
//   customerId: number;

//   @IsInt()
//   @IsOptional()
//   employeeId: number;

//   @IsInt()
//   @IsOptional()
//   tableno: number;

//   @IsNumber()
//   amount: number;

//   @IsEnum(['Cash', 'OnlinePayment'])
//   payment: 'Cash' | 'OnlinePayment';
// }


// import { IsNumber, IsOptional } from 'class-validator';

// export class CreateBillDto {
//   @IsNumber()
//   customerId: number;

//   @IsOptional()
//   @IsNumber()
//   employeeId?: number;

//   @IsOptional()
//   @IsNumber()
//   tableno?: number;
// }


// src/DatabaseEntity/bills/dto/create-bill.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number; // Customer ID to fetch orders and create the bill




}
