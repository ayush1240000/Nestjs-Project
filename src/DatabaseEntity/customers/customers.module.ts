import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { user } from '../users/entities/user.entity';
import { TransactionService } from 'src/Transaction/Transaction.service';
@Module({
  imports :[TypeOrmModule.forFeature([Customer,user]),
UsersModule],

  controllers: [CustomersController],
  providers: [CustomersService,TransactionService],
  exports :[TypeOrmModule]

})
export class CustomersModule {}
