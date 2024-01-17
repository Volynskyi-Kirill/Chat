import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from '../modules/redis.module';
import { Message } from '../message/message.schema';
import { Subject } from 'rxjs';

@Injectable()
export class PollingService {
  private gatewayEvents = new Subject<{ event: string; data: unknown }>();

  constructor(@Inject(REDIS_SERVICE) private client: ClientProxy) {}

  getEvents() {
    return this.gatewayEvents;
  }

  handleMessage(createMessageDto: CreateMessageDto) {
    this.client.emit('createMessage', createMessageDto);
  }

  sendMessage(message: Message) {
    this.gatewayEvents.next({ event: 'message', data: message });
  }
}
