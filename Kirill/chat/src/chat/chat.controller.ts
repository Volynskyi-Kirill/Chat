import { Body, Controller, Delete, Param, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AddUserToChatDto } from './dto/add-user-to-chat.dto';
import { MESSAGE_PATTERN } from '../shared/constants';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern({ cmd: MESSAGE_PATTERN.GET_USER_CHATS })
  async handleGetUserChats(userId: string) {
    return await this.chatService.getUserChats(userId);
  }

  @Get(':userId')
  async getUserChats(@Param('userId') userId: string) {
    return await this.chatService.getUserChats(userId);
  }

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Post('/user')
  async addUserToChat(@Body() addUserToChatDto: AddUserToChatDto) {
    return await this.chatService.addUserToChat(addUserToChatDto);
  }

  @Delete('/user/:chatId/:userId')
  async deleteUserFromChat(
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return await this.chatService.deleteUserFromChat(chatId, userId);
  }
}
