import { Module } from '@nestjs/common';
import { PollingService } from './polling.service';
import { PollingController } from './polling.controller';
import { RedisModule } from '../modules/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [PollingController],
  providers: [PollingService],
})
export class PollingModule {}
