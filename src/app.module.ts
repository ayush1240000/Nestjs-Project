import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
