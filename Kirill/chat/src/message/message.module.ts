import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageDBModule } from './message.db';
import { RedisModule } from '../modules/redis.module';

@Module({
  imports: [MessageDBModule, RedisModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
