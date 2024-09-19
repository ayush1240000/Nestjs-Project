import { Module , NestModule , MiddlewareConsumer} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './Middleware/logger.middleware';
import { CustomersModule } from './customers/customers.module';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './users/entities/user.entity'; 
import { Employee } from './employee/entities/employee.entity';
import { Customer } from './customers/entities/customer.entity';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ayush@1240',
      database: 'new_schema',
      entities: [user, Customer,Employee],  
      synchronize: true, 
    }),UsersModule, CustomersModule,EmployeeModule, AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');
}
}