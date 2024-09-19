import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entities/user.entity';
@Module({
  imports :[TypeOrmModule.forFeature([user])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
