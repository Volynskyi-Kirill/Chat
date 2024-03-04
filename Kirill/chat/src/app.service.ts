import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from './modules/redis.module';

@Injectable()
export class AppService {
  constructor(@Inject(REDIS_SERVICE) private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }
}
