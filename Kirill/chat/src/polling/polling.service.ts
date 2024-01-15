import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from '../modules/redis.module';

@Injectable()
export class PollingService {
  constructor(@Inject(REDIS_SERVICE) private client: ClientProxy) {}

  handleMessage(createMessageDto: CreateMessageDto) {
    this.client.emit('createMessage', createMessageDto);
  }

  sendMessage() {}
}
