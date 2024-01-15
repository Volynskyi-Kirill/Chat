import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @MessagePattern('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @MessagePattern('findOneChat')
  findOne(@Payload() id: string) {
    return this.chatService.findOne(id);
  }

  @MessagePattern('updateChat')
  update(@Payload() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @MessagePattern('removeChat')
  remove(@Payload() id: string) {
    return this.chatService.remove(id);
  }
}
