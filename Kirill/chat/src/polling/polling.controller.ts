import { Controller, Post, Body } from '@nestjs/common';
import { PollingService } from './polling.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @Post('/message')
  handleMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.pollingService.handleMessage(createMessageDto);
  }
}
