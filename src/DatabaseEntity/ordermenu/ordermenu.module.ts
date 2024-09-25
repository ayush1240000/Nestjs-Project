import { Module } from '@nestjs/common';
import { OrdermenuService } from './ordermenu.service';
import { OrdermenuController } from './ordermenu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMenu } from './entities/ordermenu.entity';
import { UserOrder } from '../userorder/entities/userorder.entity';
import { UserorderModule } from '../userorder/userorder.module';

@Module({
  imports : [TypeOrmModule.forFeature([OrderMenu]),
  UserorderModule],
  controllers: [OrdermenuController],
  providers: [OrdermenuService],

})
export class OrdermenuModule {}
