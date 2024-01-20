import {
  ConnectedSocket,
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
import { MESSAGE_EVENTS } from 'chat-utils';

interface AuthSocket extends Socket {
  user: { userId: string; username: string };
}

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

  handleConnection(client: AuthSocket) {
    console.log(`Client connected: ${client.id}`);
    const token = client.handshake.auth.token;

    try {
      const user = this.pollingService.handleConnection(token);
      client.user = user;
    } catch (error) {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(MESSAGE_EVENTS.MESSAGE)
  handleMessage(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    console.log('message from', client.user);
    this.pollingService.handleMessage(createMessageDto);
  }

  @SubscribeMessage(MESSAGE_EVENTS.PING)
  handlePing() {
    console.log('ping: ');
    return {
      event: 'pong',
      data: 'pong data',
    };
  }
}
