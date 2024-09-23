import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdermenuService } from './ordermenu.service';
import { CreateOrdermenuDto } from './dto/create-ordermenu.dto';
import { UpdateOrdermenuDto } from './dto/update-ordermenu.dto';

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
