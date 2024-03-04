import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { DelayedMessageDto } from '../message/dto/delayed-message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from '../modules/redis.module';
import { Message } from '../message/message.schema';
import { Subject } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { lastValueFrom } from 'rxjs';
import { SeenFrom } from './polling.gateway';
import { EVENT } from '../shared/constants';
import { MESSAGE_PATTERN } from '../shared/constants';
import { ChatUserDto } from '../shared/dto/chat-user.dto';
import * as schedule from 'node-schedule';

export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
}

@Injectable()
export class PollingService {
  private gatewayEvents = new Subject<{ event: string; data: unknown }>();

  constructor(
    @Inject(REDIS_SERVICE) private client: ClientProxy,
    private configService: ConfigService,
  ) {}

  getEvents() {
    return this.gatewayEvents;
  }

  handleMessage(createMessageDto: CreateMessageDto, userChats: string[]) {
    const { chatId } = createMessageDto;

    const isUserHaveAccess = userChats.includes(chatId);

    if (!isUserHaveAccess) {
      throw new ForbiddenException();
    }

    this.client.emit(EVENT.MESSAGE_INCOMING, createMessageDto);
  }

  handleMessageDelayed(
    delayedMessageDto: DelayedMessageDto,
    userChats: string[],
  ) {
    const timeToSend = new Date(delayedMessageDto.timeToSend);

    schedule.scheduleJob(timeToSend, () => {
      this.handleMessage(delayedMessageDto, userChats);
    });
  }

  sendMessage(message: Message) {
    this.gatewayEvents.next({ event: EVENT.MESSAGE, data: message });
  }

  sendMessageViewed(message: Message) {
    this.gatewayEvents.next({ event: EVENT.MESSAGE_VIEWED, data: message });
  }

  async getUserChats(userId: string) {
    const userChatsRequest = this.client.send(
      { cmd: MESSAGE_PATTERN.GET_USER_CHATS },
      userId,
    );
    return await lastValueFrom(userChatsRequest);
  }

  handleMessageViewed(seenFrom: SeenFrom) {
    this.client.emit(EVENT.MESSAGE_VIEWED, seenFrom);
  }

  handleConnection(token: string) {
    const secret = this.configService.get<string>('JWT_SECRET')!;
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  }

  handleUserAddedToChat({ chatId, userId }: ChatUserDto) {
    this.gatewayEvents.next({
      event: EVENT.USER_ADDED_TO_CHAT,
      data: { chatId, userId },
    });
  }

  handleUserRemovedFromChat({ chatId, userId }: ChatUserDto) {
    this.gatewayEvents.next({
      event: EVENT.USER_REMOVED_FROM_CHAT,
      data: { chatId, userId },
    });
  }
}
