import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserOrderService } from './userorder.service';
import { CreateUserorderDto } from './dto/create-userorder.dto';
import { UpdateUserorderDto } from './dto/update-userorder.dto';

@Controller('userorder')
export class UserorderController {
  constructor(private readonly userorderService: UserOrderService) {}

  @Post()
  create(@Body() createUserorderDto: CreateUserorderDto) {
    return this.userorderService.create(createUserorderDto);
  }

  @Get()
  findAll() {
    return this.userorderService.findAll();
  }

  // @Get('/customer')
  // getuserorder() {
  //   return this.userorderService.getuserorder();
  // }

  @Get('customer/:customerId') // Define the route with a parameter
  async getCustomerOrders(@Param('customerId') customerId: number) {
    return this.userorderService.findOrdersByCustomer(customerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userorderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserorderDto: UpdateUserorderDto) {
    return this.userorderService.update(+id, updateUserorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userorderService.remove(+id);
  }
}
