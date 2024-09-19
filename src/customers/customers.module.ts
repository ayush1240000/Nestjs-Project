import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports :[TypeOrmModule.forFeature([Customer,user]),
UsersModule],

  controllers: [CustomersController],
  providers: [CustomersService],

})
export class CustomersModule {}
