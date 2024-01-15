import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from '../modules/redis.module';
import { Server } from 'socket.io';
import { Message } from '../message/message.schema';

@Injectable()
export class PollingService {
  private gateway: Server;

  constructor(@Inject(REDIS_SERVICE) private client: ClientProxy) {}

  handleMessage(createMessageDto: CreateMessageDto) {
    this.client.emit('createMessage', createMessageDto);
  }

  setGatewayClient(client: Server) {
    this.gateway = client;
  }

  sendMessage(message: Message) {
    this.gateway.emit('message', message);
  }
}
