import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-Order.dto';

export class UpdateUserorderDto extends PartialType(CreateOrderDto) {}
