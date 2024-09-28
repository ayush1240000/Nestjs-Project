import { Module } from '@nestjs/common';
import { OrderitemService } from './orderitem.service';
import { OrderitemController } from './orderitem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderitem } from './entities/orderitem.entity';
import { Order } from '../order/entities/order.entity';
import { OrderModule } from '../order/order.module';

@Module({
  imports : [TypeOrmModule.forFeature([orderitem]),
  OrderModule],
  controllers: [OrderitemController],
  providers: [OrderitemService],

})
export class OrderitemModule {}
