import { Test, TestingModule } from '@nestjs/testing';
import { OrdermenuService } from './ordermenu.service';

describe('OrdermenuService', () => {
  let service: OrdermenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdermenuService],
    }).compile();

    service = module.get<OrdermenuService>(OrdermenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
