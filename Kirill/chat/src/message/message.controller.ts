import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { EVENT, MESSAGE_PATTERN } from '../shared/constants';
import { canDeleteMessageGuard } from './guards/canDeleteMessage.guard';
import { canDeleteMessage } from './decorators/canDeleteMessage.decorator';
import { JwtGuard } from '../shared/guards/jwt.guard';
import { Public } from '../shared/decorators/public.decorator';
import { MessagePattern } from '@nestjs/microservices';

@Controller('message')
@UseGuards(canDeleteMessageGuard)
@UseGuards(JwtGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Public()
  @EventPattern(EVENT.MESSAGE_INCOMING)
  handleMessage(createMessageDto: CreateMessageDto) {
    this.messageService.create(createMessageDto);
  }

  @Public()
  @EventPattern(EVENT.MESSAGE_VIEWED)
  async handleMessageViewed(seenFrom: { chatId: string; messageId: string }) {
    this.messageService.handleMessageViewed(seenFrom);
  }

  @Public()
  @MessagePattern({ cmd: MESSAGE_PATTERN.GET_CHAT_HISTORY })
  async handleGetChatHistory(chatId: string) {
    return await this.messageService.getChatHistory(chatId);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @canDeleteMessage()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
