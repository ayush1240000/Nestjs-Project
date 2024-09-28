import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderitemService } from './orderitem.service';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';
import { orderitem } from './entities/orderitem.entity';

@Controller('orderitem')
export class OrderitemController {
  constructor(private readonly OrderitemService: OrderitemService) {}

  @Post()
  create(@Body() CreateOrderitemDto: CreateOrderitemDto) {
    return this.OrderitemService.create(CreateOrderitemDto);
  }

  @Get()
  findAll() {
    return this.OrderitemService.findAll();
  }

  @Get('customer/:customerId')
  async findOrdersByCustomer(@Param('customerId') customerId: number): Promise<orderitem[]> {
    return this.OrderitemService.findMenuOrdersByCustomer(customerId);
  }
  

  @Get('userorder/:orderId') // Route to get menu items for a specific user order
  async findUserOrderforOrderid(@Param('orderId') orderId: number): Promise<orderitem[]> {
    return this.OrderitemService.findUserOrderforOrderid(orderId);
  }

 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.OrderitemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateOrderitemDto: UpdateOrderitemDto) {
    return this.OrderitemService.update(+id, UpdateOrderitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.OrderitemService.remove(+id);
  }
}
