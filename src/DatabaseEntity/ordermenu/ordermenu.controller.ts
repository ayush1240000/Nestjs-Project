import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdermenuService } from './ordermenu.service';
import { CreateOrdermenuDto } from './dto/create-ordermenu.dto';
import { UpdateOrdermenuDto } from './dto/update-ordermenu.dto';
import { OrderMenu } from './entities/ordermenu.entity';

@Controller('ordermenu')
export class OrdermenuController {
  constructor(private readonly ordermenuService: OrdermenuService) {}

  @Post()
  create(@Body() createOrdermenuDto: CreateOrdermenuDto) {
    return this.ordermenuService.create(createOrdermenuDto);
  }

  @Get()
  findAll() {
    return this.ordermenuService.findAll();
  }

  @Get('customer/:customerId')
  async findOrdersByCustomer(@Param('customerId') customerId: number): Promise<OrderMenu[]> {
    return this.ordermenuService.findMenuOrdersByCustomer(customerId);
  }
  

  @Get('userorder/:orderid') // Route to get menu items for a specific user order
  async findUserOrderforOrderid(@Param('orderid') orderid: number): Promise<OrderMenu[]> {
    return this.ordermenuService.findUserOrderforOrderid(orderid);
  }

 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordermenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdermenuDto: UpdateOrdermenuDto) {
    return this.ordermenuService.update(+id, updateOrdermenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordermenuService.remove(+id);
  }
}
