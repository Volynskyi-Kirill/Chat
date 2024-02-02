import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageDBModule } from './message.db';
import { RedisModule } from '../modules/redis.module';
import { JwtStrategy } from '../shared/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MessageDBModule, RedisModule],
  controllers: [MessageController],
  providers: [MessageService, JwtStrategy, ConfigService],
})
export class MessageModule {}
