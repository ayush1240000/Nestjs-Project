import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdermenuDto } from './create-ordermenu.dto';

export class UpdateOrdermenuDto extends PartialType(CreateOrdermenuDto) {}
