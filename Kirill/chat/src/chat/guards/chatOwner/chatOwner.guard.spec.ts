import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { ChatService } from '../../chat.service';
import { ChatDocument } from './../../chat.schema';
import { Reflector } from '@nestjs/core';
import { ChatOwnerGuard } from './chatOwner.guard';
import { ChatDBModule } from '../../chat.db';
import { RedisModule } from '../../../modules/redis.module';
import { JwtStrategy } from '../../../shared/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { getMockContext } from './chatOwner.guard.fixtures';

describe('ChatOwnerGuard', () => {
  let chatOwnerGuard: ChatOwnerGuard;
  let reflector: Reflector;
  let chatService: ChatService;
  // let redisSendResult = '1';

  // const redisClient = {
  //   send: () => ({
  //     subscribe: (observer: any) => {
  //       observer.next(redisSendResult);
  //       observer.complete();
  //     },
  //   }),
  // };

  // const mockReflector = {
  //   get: jest.fn(),
  //   getAllAndOverride: jest.fn(),
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatDBModule, RedisModule],
      providers: [
        ChatOwnerGuard,
        // { provide: Reflector, useValue: mockReflector },
        // { provide: 'REDIS_SERVICE', useValue: redisClient },
        ChatService,
        Reflector,
        JwtStrategy,
        ConfigService,
      ],
    }).compile();

    chatOwnerGuard = module.get<ChatOwnerGuard>(ChatOwnerGuard);
    chatService = module.get<ChatService>(ChatService);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(chatOwnerGuard).toBeDefined();
  });

  it('should throw Forbidden Exception if user is not chat owner', async () => {
    const chatId = 'chatId';
    const mockContext = getMockContext(chatId);
    // redisSendResult = 'chat_id';

    jest.spyOn(reflector, 'get').mockImplementation(() => true);
    jest.spyOn(chatService, 'findById').mockImplementation(() => chatId as any);

    await expect(chatOwnerGuard.canActivate(mockContext)).rejects.toThrow(
      ForbiddenException,
    );
  });
});
