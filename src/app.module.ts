import { Module , NestModule , MiddlewareConsumer} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './Middleware/logger.middleware';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');
}
}