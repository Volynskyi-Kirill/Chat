import { Body, Controller, Delete, Param, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { MESSAGE_PATTERN } from '../shared/constants';
import { ChatUserDto } from '../shared/dto/chat-user.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern({ cmd: MESSAGE_PATTERN.GET_USER_CHATS })
  async handleGetUserChats(userId: string) {
    return await this.chatService.getIdUserChats(userId);
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
  async addUserToChat(@Body() addUserToChatDto: ChatUserDto) {
    return await this.chatService.addUserToChat(addUserToChatDto);
  }

  // удалить чат может только его создатель
  // либо проверка либо гвард на совпадение user._id и chat.createdBy
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }

  @Delete('/user/:chatId/:userId')
  async deleteUserFromChat(
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return await this.chatService.deleteUserFromChat(chatId, userId);
  }
}
