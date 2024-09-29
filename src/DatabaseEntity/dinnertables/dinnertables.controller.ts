import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DinnertablesService } from './dinnertables.service';
import { CreateDinnertableDto } from './dto/create-dinnertable.dto';
import { UpdateDinnertableDto } from './dto/update-dinnertable.dto';

@Controller('dinnertables')
export class DinnertablesController {
  constructor(private readonly dinnertablesService: DinnertablesService) {}

  @Post()
  create(@Body() createDinnertableDto: CreateDinnertableDto) {
    return this.dinnertablesService.create(createDinnertableDto);
  }

  @Get()
  findAll() {
    return this.dinnertablesService.findAll();
  }

  @Get('/customer')
  findDinnerTableByCustomer() {
    return this.dinnertablesService.findDinnerTableByCustomer();
  }
  @Get('/customer/:customerId')
  findDinnerTableByCustomerid(@Param('customerId') customerId :number) {
    return this.dinnertablesService.findDinnerTableByCustomerid(customerId);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dinnertablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDinnertableDto: UpdateDinnertableDto) {
    return this.dinnertablesService.update(+id, updateDinnertableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dinnertablesService.remove(+id);
  }
}
