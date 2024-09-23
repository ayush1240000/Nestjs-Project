import { Test, TestingModule } from '@nestjs/testing';
import { DinnertablesService } from './dinnertables.service';

describe('DinnertablesService', () => {
  let service: DinnertablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DinnertablesService],
    }).compile();

    service = module.get<DinnertablesService>(DinnertablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
