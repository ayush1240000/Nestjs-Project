import { Test, TestingModule } from '@nestjs/testing';
import { UserorderController } from './userorder.controller';
import { UserorderService } from './userorder.service';

describe('UserorderController', () => {
  let controller: UserorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserorderController],
      providers: [UserorderService],
    }).compile();

    controller = module.get<UserorderController>(UserorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
