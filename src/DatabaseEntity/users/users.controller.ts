import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { usersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '../../authentication/jwt-auth.guard';
import { RolesGuard } from 'src/authroization/roles.guard';
import { Roles } from 'src/authroization/roles.enum';
import { Role } from 'src/authroization/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: usersService) {}


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get() 
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }  

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


}
