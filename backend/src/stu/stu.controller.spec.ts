import { Test, TestingModule } from '@nestjs/testing';
import { StuController } from './stu.controller';

describe('StuController', () => {
  let controller: StuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StuController],
    }).compile();

    controller = module.get<StuController>(StuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
