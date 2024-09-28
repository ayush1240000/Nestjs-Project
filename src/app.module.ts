import { Module , NestModule , MiddlewareConsumer} from '@nestjs/common';
import { UsersModule } from './DatabaseEntity/users/users.module';
import { LoggerMiddleware } from './Middleware/logger.middleware';
import { CustomersModule } from './DatabaseEntity/customers/customers.module';
import { EmployeeModule } from './DatabaseEntity/employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './DatabaseEntity/users/entities/user.entity'; 
import { Employee } from './DatabaseEntity/employee/entities/employee.entity';
import { Customer } from './DatabaseEntity/customers/entities/customer.entity';
import { AuthModule } from './authentication/auth.module';
import { MenusModule } from './DatabaseEntity/menus/menus.module';
import { OrderModule } from './DatabaseEntity/order/order.module';
import { OrderitemModule } from './DatabaseEntity/orderitem/orderitem.module';
import { DinnertablesModule } from './DatabaseEntity/dinnertables/dinnertables.module';
import { BillsModule } from './DatabaseEntity/bills/bills.module';
import { Menu } from './DatabaseEntity/menus/entities/menu.entity';
import { orderitem } from './DatabaseEntity/orderitem/entities/orderitem.entity';
import { Order } from './DatabaseEntity/order/entities/order.entity';
import { DinnerTable } from './DatabaseEntity/dinnertables/entities/dinnertable.entity';
import { Bill } from './DatabaseEntity/bills/entities/bill.entity';
import { TransactionService } from './Transaction/Transaction.service';
// import { SalaryModule } from './DatabaseEntity/salary/salary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ayush@1240',
      database: 'newdb',
      entities: [user, Customer,Employee,Menu,Order,orderitem,DinnerTable,Bill],  
      synchronize: true, 
    }),UsersModule, CustomersModule,EmployeeModule,AuthModule, MenusModule, OrderModule, OrderitemModule, DinnertablesModule, BillsModule ],
  controllers: [],
  providers: [TransactionService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes();
}
}

