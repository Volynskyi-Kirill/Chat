import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { ChatService } from '../../chat.service';
import { Reflector } from '@nestjs/core';
import { ChatOwnerGuard } from './chatOwner.guard';
import { ChatDBModule } from '../../chat.db';
import { RedisModule } from '../../../modules/redis.module';
import { JwtStrategy } from '../../../shared/jwt.strategy';
import { ConfigService } from '@nestjs/config';

describe('ChatOwnerGuard', () => {
  let chatOwnerGuard: ChatOwnerGuard;
  let reflector: Reflector;
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatDBModule, RedisModule],
      providers: [
        ChatOwnerGuard,
        ChatService,
        Reflector,
        JwtStrategy,
        ConfigService,
      ],
    }).compile();

    chatOwnerGuard = module.get<ChatOwnerGuard>(ChatOwnerGuard);
  });

  it('should be defined', () => {
    expect(chatOwnerGuard).toBeDefined();
  });

  // it('should throw Forbidden Exception', async () => {
  //   const createdBy = 'ownerUserId';

  //   jest.spyOn(reflector, 'get').mockReturnValueOnce(true);
  //   jest.spyOn(ChatService, 'findById').mockResolvedValueOnce({ createdBy });

  //   // await expect();
  // });
});
