import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { PollingService } from './polling.service';

@WebSocketGateway()
export class PollingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly pollingService: PollingService) {}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WevSocket Gateway initialized');

    this.pollingService.getEvents().subscribe({
      next: ({ event, data }) => {
        server.emit(event, data);
      },
    });
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    this.pollingService.handleMessage(createMessageDto);
  }

  @SubscribeMessage('ping')
  handlePing() {
    console.log('ping: ');
    return {
      event: 'pong',
      data: 'pong data',
    };
  }
}
