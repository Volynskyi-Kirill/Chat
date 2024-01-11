import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @EventPattern('message:test')
  handleUserGet() {
    console.log(`from message`);
    return `from message`;
  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
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
  // @MessagePattern('createMessage')
  // create(@Payload() createMessageDto: CreateMessageDto) {
  //   return this.messageService.create(createMessageDto);
  // }

  // @MessagePattern('findAllMessage')
  // findAll() {
  //   return this.messageService.findAll();
  // }

  // @MessagePattern('findOneMessage')
  // findOne(@Payload() id: string) {
  //   return this.messageService.findOne(id);
  // }

  // @MessagePattern('updateMessage')
  // update(@Payload() updateMessageDto: UpdateMessageDto) {
  //   return this.messageService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @MessagePattern('removeMessage')
  // remove(@Payload() id: string) {
  //   return this.messageService.remove(id);
  // }
}
