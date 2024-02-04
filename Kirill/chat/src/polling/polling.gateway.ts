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
import { JwtPayload } from './polling.service';
import { EVENT, ACTION } from '../shared/constants';

export interface AuthSocket extends Socket {
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
      next: ({ event, data }: { event: string; data: any }) => {
        const { chatId, userId } = data;

        const handleUserEvent = (action: string) => {
          const clients = this.server.sockets.sockets;

          clients.forEach((client: AuthSocket) => {
            const isUserSocket = client.user.userId === userId;
            if (isUserSocket) {
              switch (action) {
                case ACTION.ADD:
                  client.join(chatId);
                  client.user.chats = [...client.user.chats, chatId];
                  break;
                case ACTION.REMOVE:
                  client.leave(chatId);
                  client.user.chats = client.user.chats.filter(
                    (chat) => chat !== chatId,
                  );
                  break;
              }
            }
          });
        };

        switch (event) {
          case EVENT.USER_ADDED_TO_CHAT:
            handleUserEvent(ACTION.ADD);
            break;

          case EVENT.USER_REMOVED_FROM_CHAT:
            server.to(chatId).emit(event, data);
            handleUserEvent(ACTION.REMOVE);
            break;
        }

        server.to(chatId).emit(event, data);
      },
    });
  }

  async handleConnection(client: AuthSocket) {
    const token = client.handshake.auth.token;

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

  @SubscribeMessage(EVENT.MESSAGE)
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
