import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { UsersModule } from '../DatabaseEntity/users/users.module'; // Ensure this path is correct
import { AuthService } from './auth.service';
import { JwtStrategy } from './JwtStrategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your_jwt_secret_key', 
      signOptions: { expiresIn: '6000s' }, 
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}import { usersService } from 'src/DatabaseEntity/users/users.service';

