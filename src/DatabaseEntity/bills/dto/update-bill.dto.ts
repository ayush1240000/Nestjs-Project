import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateBillDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;
  }
  