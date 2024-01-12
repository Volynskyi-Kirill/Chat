import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { MessageDBModule } from './message.db';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MessageDBModule],
      providers: [MessageService],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
