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
import { UserorderModule } from '../userorder/userorder.module';
import { OrdermenuModule } from '../ordermenu/ordermenu.module';
import { BillsController } from './bills.controller';
import { UserOrder } from '../userorder/entities/userorder.entity';
import { OrderMenu } from '../ordermenu/entities/ordermenu.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Bill,Customer,Menu,DinnerTable,Employee,UserOrder,OrderMenu]),
CustomersModule,EmployeeModule,DinnertablesModule ,UserorderModule,OrdermenuModule],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
