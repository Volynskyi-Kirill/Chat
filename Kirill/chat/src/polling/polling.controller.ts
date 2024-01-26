import { Controller } from '@nestjs/common';
import { PollingService } from './polling.service';
import { EventPattern } from '@nestjs/microservices';
import { Message } from '../message/message.schema';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @EventPattern('messageCreated')
  handleMessageCreated(message: Message) {
    this.pollingService.sendMessage(message);
  }

  @EventPattern('updateMessageViewed')
  handleMessageViewed(message: Message) {
    this.pollingService.sendMessageViewed(message);
  }
}
