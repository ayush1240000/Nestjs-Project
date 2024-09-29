import { Module } from '@nestjs/common';
import { DinnertablesService } from './dinnertables.service';
import { DinnertablesController } from './dinnertables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DinnerTable } from './entities/dinnertable.entity';

@Module({
  imports :[TypeOrmModule.forFeature([DinnerTable])],
  controllers: [DinnertablesController],
  providers: [DinnertablesService],
  exports :[TypeOrmModule,DinnertablesService]
})
export class DinnertablesModule {}
