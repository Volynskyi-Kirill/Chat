import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatDBModule } from './chat.db';
import { RedisModule } from '../modules/redis.module';
import { JwtStrategy } from '../shared/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { jwtGuard } from '../config/guard.config';
import { ChatOwnerGuard } from './guards/chatOwner.guard';

const chatOwnerGuard = {
  provide: APP_GUARD,
  useClass: ChatOwnerGuard,
};

@Module({
  imports: [ChatDBModule, RedisModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    JwtStrategy,
    jwtGuard,
    ConfigService,
    chatOwnerGuard,
  ],
})
export class ChatModule {}
