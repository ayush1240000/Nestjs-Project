import { Injectable } from '@nestjs/common';
import { CreateOrdermenuDto } from './dto/create-ordermenu.dto';
import { UpdateOrdermenuDto } from './dto/update-ordermenu.dto';

@Injectable()
export class OrdermenuService {
  create(createOrdermenuDto: CreateOrdermenuDto) {
    return 'This action adds a new ordermenu';
  }

  findAll() {
    return `This action returns all ordermenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordermenu`;
  }

  update(id: number, updateOrdermenuDto: UpdateOrdermenuDto) {
    return `This action updates a #${id} ordermenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordermenu`;
  }
}
