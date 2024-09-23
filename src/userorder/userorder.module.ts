import { Module } from '@nestjs/common';
import { UserorderService } from './userorder.service';
import { UserorderController } from './userorder.controller';

@Module({
  controllers: [UserorderController],
  providers: [UserorderService],
})
export class UserorderModule {}
