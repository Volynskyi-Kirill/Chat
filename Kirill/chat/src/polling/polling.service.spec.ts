import { Test, TestingModule } from '@nestjs/testing';
import { PollingService } from './polling.service';
import { RedisModule } from '../modules/redis.module';

describe('PollingService', () => {
  let service: PollingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [PollingService],
    }).compile();

    service = module.get<PollingService>(PollingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
