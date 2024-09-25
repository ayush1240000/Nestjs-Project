import { Module } from '@nestjs/common';
import { BillService } from './bills.service';
import { BillController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { CustomersModule } from '../customers/customers.module';
import { EmployeeModule } from '../employee/employee.module';
import { DinnertablesModule } from '../dinnertables/dinnertables.module';
import { Customer } from '../customers/entities/customer.entity';
import { Employee } from '../employee/entities/employee.entity';
import { DinnerTable } from '../dinnertables/entities/dinnertable.entity';
import { Menu } from '../menus/entities/menu.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Bill]),
CustomersModule,EmployeeModule,DinnertablesModule],
  controllers: [BillController],
  providers: [BillService],
})
export class BillsModule {}
