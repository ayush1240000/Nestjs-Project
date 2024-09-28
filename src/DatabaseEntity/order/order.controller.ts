import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateUserorderDto } from './dto/update-order.dto';

@Controller('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() CreateOrderDto: CreateOrderDto) {
    return this.orderService.create(CreateOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }


  @Get('customer/:customerId') // Define the route with a parameter
  async getCustomerOrders(@Param('customerId') customerId: number) {
    return this.orderService.findOrdersByCustomer(customerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserorderDto: UpdateUserorderDto) {
    return this.orderService.update(+id, updateUserorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
