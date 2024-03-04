import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ChatDBModule } from './chat.db';
import { getModelToken } from '@nestjs/mongoose';
import { Chat } from './chat.schema';
import { RedisModule } from '../modules/redis.module';

describe('ChatService', () => {
  let chatService: ChatService;

  const mockChatService = {
    create: jest.fn(),
    findById: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatDBModule, RedisModule],
      providers: [
        ChatService,
        {
          provide: getModelToken(Chat.name),
          useValue: mockChatService,
        },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
  });
});
