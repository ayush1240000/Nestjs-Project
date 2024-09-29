import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { CustomersModule } from '../customers/customers.module';
import { EmployeeModule } from '../employee/employee.module';
import { DinnertablesModule } from '../dinnertables/dinnertables.module';
import { Customer } from '../customers/entities/customer.entity';
import { Employee } from '../employee/entities/employee.entity';
import { DinnerTable } from '../dinnertables/entities/dinnertable.entity';
import { Menu } from '../menus/entities/menu.entity';
import { BillsService } from './bills.service';
import { OrderModule } from '../order/order.module';
import { OrderitemModule } from '../orderitem/orderitem.module';
import { BillsController } from './bills.controller';
import { Order } from '../order/entities/order.entity';
import { orderitem } from '../orderitem/entities/orderitem.entity';
import { DinnertablesService } from '../dinnertables/dinnertables.service';

@Module({
  imports :[TypeOrmModule.forFeature([Bill,Customer,Menu,DinnerTable,Employee,Order,orderitem]),
CustomersModule,EmployeeModule,DinnertablesModule ,OrderModule,OrderitemModule],
  controllers: [BillsController],
  providers: [BillsService,DinnertablesService],
})
export class BillsModule {}
