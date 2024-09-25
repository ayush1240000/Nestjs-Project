import { IsNumber } from "class-validator";

export class UpdateBillDto {
    @IsNumber()
    amount: number;
  }
  