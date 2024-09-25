import { Module } from '@nestjs/common';
import { UserOrderService } from './userorder.service';
import { UserorderController } from './userorder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrder } from './entities/userorder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrder])],
  controllers: [UserorderController],
  providers: [UserOrderService],
  exports: [TypeOrmModule], 
 
})
export class UserorderModule {}
