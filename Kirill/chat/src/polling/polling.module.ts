import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollingService } from './polling.service';
import { PollingController } from './polling.controller';
import { RedisModule } from '../modules/redis.module';
import { PollingGateway } from './polling.gateway';

@Module({
  imports: [RedisModule, ConfigModule.forRoot()],
  controllers: [PollingController],
  providers: [PollingService, PollingGateway],
})
export class PollingModule {}
