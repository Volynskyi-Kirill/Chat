import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { ChatService } from '../../chat.service';
import { ChatDocument } from '../../chat.schema';
import { Reflector } from '@nestjs/core';
import { ChatMemberGuard } from './chatMember.guard';
import { ChatDBModule } from '../../chat.db';
import { RedisModule } from '../../../modules/redis.module';
import { JwtStrategy } from '../../../shared/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { getMockContext } from './chatMember.guard.fixtures';

describe('ChatMemberGuard', () => {
  let chatMemberGuard: ChatMemberGuard;
  let reflector: Reflector;
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatDBModule, RedisModule],
      providers: [
        ChatMemberGuard,
        ChatService,
        Reflector,
        JwtStrategy,
        ConfigService,
      ],
    }).compile();

    chatMemberGuard = module.get<ChatMemberGuard>(ChatMemberGuard);
    chatService = module.get<ChatService>(ChatService);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(chatMemberGuard).toBeDefined();
  });

  it('should return true without metadata', async () => {
    const chatId = 'chatId';
    const memberId = 'memberId';
    const mockContext = getMockContext(chatId, memberId);

    jest.spyOn(reflector, 'get').mockImplementation(() => false);

    await expect(chatMemberGuard.canActivate(mockContext)).toBeTruthy();
  });

  it('should throw Forbidden Exception if user is not chat member', async () => {
    const chatId = 'chatId';
    const users = ['userId1', 'userId2'];
    const memberId = 'memberId';
    const mockContext = getMockContext(chatId, memberId);

    jest.spyOn(reflector, 'get').mockImplementation(() => true);
    jest.spyOn(chatService, 'findById').mockImplementation(function () {
      return Promise.resolve({
        users,
      } as ChatDocument);
    });

    await expect(chatMemberGuard.canActivate(mockContext)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should return true if user chat member', async () => {
    const chatId = 'chatId';
    const users = ['userId1', 'userId2', 'memberId'];
    const memberId = 'memberId';
    const mockContext = getMockContext(chatId, memberId);

    jest.spyOn(reflector, 'get').mockImplementation(() => true);
    jest.spyOn(chatService, 'findById').mockImplementation(function () {
      return Promise.resolve({
        users,
      } as ChatDocument);
    });

    await expect(chatMemberGuard.canActivate(mockContext)).toBeTruthy();
  });
});
