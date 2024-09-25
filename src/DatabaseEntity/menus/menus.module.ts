import { Module } from '@nestjs/common';
import { MenuService } from './menus.service';
import { MenusController } from './menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Menu])],
  controllers: [MenusController],
  providers: [MenuService],
})
export class MenusModule {}
