import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserorderService } from './userorder.service';
import { CreateUserorderDto } from './dto/create-userorder.dto';
import { UpdateUserorderDto } from './dto/update-userorder.dto';

@Controller('userorder')
export class UserorderController {
  constructor(private readonly userorderService: UserorderService) {}

  @Post()
  create(@Body() createUserorderDto: CreateUserorderDto) {
    return this.userorderService.create(createUserorderDto);
  }

  @Get()
  findAll() {
    return this.userorderService.findAll();
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
