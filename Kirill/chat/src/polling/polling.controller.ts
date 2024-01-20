import { Controller } from '@nestjs/common';
import { PollingService } from './polling.service';
import { EventPattern } from '@nestjs/microservices';
import { Message } from '../message/message.schema';
import { MESSAGE_EVENTS } from 'chat-utils';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @EventPattern(MESSAGE_EVENTS.SEND_MESSAGE)
  sendMessage(message: Message) {
    this.pollingService.sendMessage(message);
  }
}
