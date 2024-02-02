import {
  Body,
  Controller,
  Delete,
  Param,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { MESSAGE_PATTERN } from '../shared/constants';
import { ChatUserDto } from '../shared/dto/chat-user.dto';
import { ChatOwner } from './decorators/chatOwner.decorator';
import { ChatOwnerGuard } from './guards/chatOwner.guard';
import { JwtGuard } from '../shared/guards/jwt.guard';

@Controller('chat')
@UseGuards(ChatOwnerGuard)
@UseGuards(JwtGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern({ cmd: MESSAGE_PATTERN.GET_USER_CHATS })
  async handleGetUserChats(userId: string) {
    return await this.chatService.getIdUserChats(userId);
  }

  @MessagePattern({ cmd: MESSAGE_PATTERN.GET_CHAT_BY_ID })
  async handleGetChatById(chatId: string) {
    console.log('MessagePattern: ');
    return await this.chatService.findById(chatId);
  }

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @ChatOwner()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }

  @Get('/user/:userId')
  async getUserChats(@Param('userId') userId: string) {
    return await this.chatService.getUserChats(userId);
  }

  @ChatOwner()
  @Post('/user')
  async addUserToChat(@Body() addUserToChatDto: ChatUserDto) {
    return await this.chatService.addUserToChat(addUserToChatDto);
  }

  @ChatOwner()
  @Delete('/user/:chatId/:userId')
  async deleteUserFromChat(
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return await this.chatService.deleteUserFromChat(chatId, userId);
  }
}
