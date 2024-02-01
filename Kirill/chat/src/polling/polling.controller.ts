import { Controller } from '@nestjs/common';
import { PollingService } from './polling.service';
import { EventPattern } from '@nestjs/microservices';
import { Message } from '../message/message.schema';
import { EVENT } from '../shared/constants';
import { ChatUserDto } from '../shared/dto/chat-user.dto';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @EventPattern(EVENT.MESSAGE_CREATED)
  handleMessageCreated(message: Message) {
    this.pollingService.sendMessage(message);
  }

  @EventPattern(EVENT.MESSAGE_SEEN_AT_UPDATED)
  handleMessageViewed(message: Message) {
    this.pollingService.sendMessageViewed(message);
  }

  @EventPattern(EVENT.USER_ADDED_TO_CHAT)
  handleUserAddedToChat({ chatId, userId }: ChatUserDto) {
    this.pollingService.handleUserAddedToChat({ chatId, userId });
  }

  @EventPattern(EVENT.USER_REMOVED_FROM_CHAT)
  handleUserRemovedFromChat({ chatId, userId }: ChatUserDto) {
    this.pollingService.handleUserRemovedFromChat({ chatId, userId });
  }
}
