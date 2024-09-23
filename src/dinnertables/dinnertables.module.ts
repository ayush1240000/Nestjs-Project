import { Module } from '@nestjs/common';
import { DinnertablesService } from './dinnertables.service';
import { DinnertablesController } from './dinnertables.controller';

@Module({
  controllers: [DinnertablesController],
  providers: [DinnertablesService],
})
export class DinnertablesModule {}
