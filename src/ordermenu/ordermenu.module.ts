import { Module } from '@nestjs/common';
import { OrdermenuService } from './ordermenu.service';
import { OrdermenuController } from './ordermenu.controller';

@Module({
  controllers: [OrdermenuController],
  providers: [OrdermenuService],
})
export class OrdermenuModule {}
