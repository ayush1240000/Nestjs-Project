import { Test, TestingModule } from '@nestjs/testing';
import { DinnertablesController } from './dinnertables.controller';
import { DinnertablesService } from './dinnertables.service';

describe('DinnertablesController', () => {
  let controller: DinnertablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DinnertablesController],
      providers: [DinnertablesService],
    }).compile();

    controller = module.get<DinnertablesController>(DinnertablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
