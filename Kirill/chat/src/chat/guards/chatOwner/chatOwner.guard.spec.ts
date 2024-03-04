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
    chatService = module.get<ChatService>(ChatService);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(chatOwnerGuard).toBeDefined();
  });

  it('should return true without metadata', async () => {
    const chatId = 'chatId';
    const ownerId = 'ownerId';
    const mockContext = getMockContext(chatId, ownerId);

    jest.spyOn(reflector, 'get').mockImplementation(() => false);

    await expect(chatOwnerGuard.canActivate(mockContext)).toBeTruthy();
  });

  it('should throw Forbidden Exception if user is not chat owner', async () => {
    const chatId = 'chatId';
    const userId = 'userId';
    const ownerId = 'ownerId';
    const mockContext = getMockContext(chatId, ownerId);

    jest.spyOn(reflector, 'get').mockImplementation(() => true);
    jest.spyOn(chatService, 'findById').mockImplementation(function () {
      return Promise.resolve({
        createdBy: userId,
      } as ChatDocument);
    });

    await expect(chatOwnerGuard.canActivate(mockContext)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should return true if user chat owner', async () => {
    const chatId = 'chatId';
    const ownerId = 'ownerId';
    const mockContext = getMockContext(chatId, ownerId);

    jest.spyOn(reflector, 'get').mockImplementation(() => true);
    jest.spyOn(chatService, 'findById').mockImplementation(function () {
      return Promise.resolve({
        createdBy: ownerId,
      } as ChatDocument);
    });

    await expect(chatOwnerGuard.canActivate(mockContext)).toBeTruthy();
  });
});
