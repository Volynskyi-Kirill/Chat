import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatDBModule } from './chat.db';
import { RedisModule } from '../modules/redis.module';

@Module({
  imports: [ChatDBModule, RedisModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
