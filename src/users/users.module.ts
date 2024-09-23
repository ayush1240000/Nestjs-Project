import { Module } from '@nestjs/common';
import { usersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entities/user.entity';
@Module({
  imports :[TypeOrmModule.forFeature([user])],
  controllers: [UsersController],
  providers: [usersService],
  exports: [usersService, TypeOrmModule]
})
export class UsersModule {}
