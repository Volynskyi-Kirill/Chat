import { Controller } from '@nestjs/common';
import { PollingService } from './polling.service';
import { EventPattern } from '@nestjs/microservices';
import { Message } from '../message/message.schema';
import { EVENT } from '../shared/constants';

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
}
