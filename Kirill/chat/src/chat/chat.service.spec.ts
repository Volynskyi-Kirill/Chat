import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ChatDBModule } from './chat.db';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat, ChatSchema } from './chat.schema';
import { JwtStrategy } from '../shared/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '../modules/redis.module';

describe('ChatService', () => {
  let chatService: ChatService;
  let model: Model<Chat>;

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
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [ChatDBModule, RedisModule],
    //   providers: [ChatService],
    // }).compile();

    chatService = module.get<ChatService>(ChatService);
    model = module.get<Model<Chat>>(getModelToken(Chat.name));
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
  });

  it('should create a new chat', async () => {
    const mockChat = {
      users: ['65c11635aaf70b300b443b7a', '65c11651aaf70b300b443b7f'],
      admins: ['65c11635aaf70b300b443b7a'],
      name: 'mega chat',
      createdBy: '65c11635aaf70b300b443b7a',
    };

    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockChat));

    const result = await chatService.create(mockChat as CreateChatDto);
    expect(result).toEqual(mockChat);
  });
});
