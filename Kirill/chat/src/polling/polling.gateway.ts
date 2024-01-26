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
import { JwtPayload } from './polling.service';

interface AuthSocket extends Socket {
  user: JwtPayload & {
    chats: string[];
  };
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

  async handleConnection(client: AuthSocket) {
    console.log(`Client connected: ${client.id}`);
    const token = client.handshake.auth.token;

    try {
      const user = this.pollingService.handleConnection(token) as JwtPayload & {
        chats: string[];
      };
      const userChats = await this.pollingService.getUserChats(user.userId);
      user.chats = userChats;
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
    const userChats = client.user.chats;
    this.pollingService.handleMessage(createMessageDto, userChats);
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
