import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderitemDto {
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
