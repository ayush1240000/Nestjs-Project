import { Test, TestingModule } from '@nestjs/testing';
import { OrdermenuController } from './ordermenu.controller';
import { OrdermenuService } from './ordermenu.service';

describe('OrdermenuController', () => {
  let controller: OrdermenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdermenuController],
      providers: [OrdermenuService],
    }).compile();

    controller = module.get<OrdermenuController>(OrdermenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
