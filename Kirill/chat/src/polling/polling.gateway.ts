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
import { EVENT } from '../shared/constants';

interface AuthSocket extends Socket {
  user: JwtPayload & {
    chats: string[];
  };
}

export interface SeenFrom {
  chatId: string;
  messageId: string;
}

@WebSocketGateway()
export class PollingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly pollingService: PollingService) {}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.pollingService.getEvents().subscribe({
      next: ({ event, data }) => {
        const { chatId }: any = data;
        server.to(chatId).emit(event, data);
      },
    });
  }

  async handleConnection(client: AuthSocket) {
    // const token = client.handshake.auth.token;
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFlZmIzOTU2N2FhMmM1YjE5MDdiNDIiLCJ1c2VybmFtZSI6ImtpcmlsbCIsImVtYWlsIjoia2lyaWxsMTA4Ym9sQGdtYWlsLmNvbSIsImlhdCI6MTcwNjE5MDUxN30.DplMFertBScyqYxFb0I0XBGFTBDLowcYfxtabYwf3nM';

    try {
      const user = this.pollingService.handleConnection(token) as JwtPayload & {
        chats: string[];
      };

      const userChats = await this.pollingService.getUserChats(user.userId);

      userChats.forEach((chatId: string) => client.join(chatId));

      user.chats = userChats;
      client.user = user;
    } catch (error) {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {}

  @SubscribeMessage(MESSAGE_EVENTS.MESSAGE)
  handleMessage(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    const userChats = client.user.chats;
    this.pollingService.handleMessage(createMessageDto, userChats);
  }

  @SubscribeMessage(EVENT.MESSAGE_VIEWED)
  handleMessageViewed(@MessageBody() seenFrom: SeenFrom) {
    this.pollingService.handleMessageViewed(seenFrom);
  }

  @SubscribeMessage(EVENT.PING)
  handlePing() {
    return {
      event: 'pong',
      data: 'pong data',
    };
  }
}
