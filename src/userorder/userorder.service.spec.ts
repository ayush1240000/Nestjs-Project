import { Test, TestingModule } from '@nestjs/testing';
import { UserorderService } from './userorder.service';

describe('UserorderService', () => {
  let service: UserorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserorderService],
    }).compile();

    service = module.get<UserorderService>(UserorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
