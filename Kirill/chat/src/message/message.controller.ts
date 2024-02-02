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
import { EVENT } from '../shared/constants';
import { ChatOwner } from './decorators/chatOwner.decorator';
import { ChatOwnerGuard } from './guards/chatOwner.guard';
import { JwtGuard } from '../shared/guards/jwt.guard';

@Controller('message')
@UseGuards(ChatOwnerGuard)
@UseGuards(JwtGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @EventPattern(EVENT.MESSAGE_INCOMING)
  handleMessage(createMessageDto: CreateMessageDto) {
    this.messageService.create(createMessageDto);
  }

  @EventPattern(EVENT.MESSAGE_VIEWED)
  async handleMessageViewed(seenFrom: { chatId: string; messageId: string }) {
    this.messageService.handleMessageViewed(seenFrom);
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

  @ChatOwner()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
