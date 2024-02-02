import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatDBModule } from './chat.db';
import { RedisModule } from '../modules/redis.module';
import { JwtStrategy } from '../shared/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ChatDBModule, RedisModule],
  controllers: [ChatController],
  providers: [ChatService, JwtStrategy, ConfigService],
})
export class ChatModule {}
