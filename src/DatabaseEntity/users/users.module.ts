import { Module } from '@nestjs/common';
import { usersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entities/user.entity';
import { TransactionService } from 'src/Transaction/Transaction.service';
@Module({
  imports :[TypeOrmModule.forFeature([user])],
  controllers: [UsersController],
  providers: [usersService,TransactionService],

  exports: [usersService, TypeOrmModule]
})
export class UsersModule {}
