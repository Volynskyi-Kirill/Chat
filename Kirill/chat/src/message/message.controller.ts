import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @EventPattern('incomingMessage')
  async handleMessage(createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);
    this.messageService.handleCreatedMessage(message);
  }

  @EventPattern('messageViewed')
  async handleMessageViewed(seenFrom: { chatId: string; messageId: string }) {
    this.messageService.handleMessageViewed(seenFrom);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
