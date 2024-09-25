import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrdermenuDto {
  @IsInt()
  @IsNotEmpty()
  orderid: number;

  @IsInt()
  @IsNotEmpty()
  menuid: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
