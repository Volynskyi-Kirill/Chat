import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatUserDto } from '../shared/dto/chat-user.dto';
import { REDIS_SERVICE } from '../modules/redis.module';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT, MESSAGE_PATTERN } from '../shared/constants';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  private readonly chatModel;
  constructor(
    @InjectConnection('chat') private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private client: ClientProxy,
  ) {
    this.chatModel = this.connection.model<ChatDocument>(Chat.name);
  }

  create(createChatDto: CreateChatDto) {
    return this.chatModel.create(createChatDto);
  }

  async findById(id: string) {
    const chat = await this.chatModel.findById(id);
    if (!chat) {
      throw new NotFoundException();
    }
    return chat;
  }

  remove(chatId: string) {
    return this.chatModel.findByIdAndDelete(chatId);
  }

  async addUserToChat({ chatId, userId }: ChatUserDto) {
    const result = await this.chatModel.findByIdAndUpdate(
      chatId,
      {
        $addToSet: { users: userId },
      },
      { new: true },
    );
    this.client.emit(EVENT.USER_ADDED_TO_CHAT, { chatId, userId });
    return result;
  }

  async deleteUserFromChat(chatId: string, userId: string) {
    const result = await this.chatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true },
    );
    this.client.emit(EVENT.USER_REMOVED_FROM_CHAT, { chatId, userId });
    return result;
  }

  getUserChats(userId: string) {
    return this.chatModel.find({ users: userId });
  }

  getIdUserChats(userId: string) {
    return this.chatModel
      .find({ users: userId })
      .select('_id')
      .then((chats) => chats.map((chat) => chat._id.toString()));
  }

  getChatAdmins(chatId: string) {
    return this.chatModel
      .findById(chatId)
      .select('admins')
      .then((result) => result?.admins);
  }

  async getChatHistory(chatId: string) {
    const chatHistoryRequest = this.client.send(
      { cmd: MESSAGE_PATTERN.GET_CHAT_HISTORY },
      chatId,
    );
    return await lastValueFrom(chatHistoryRequest);
  }

  async addAdminToChat(chatId: string, userId: string) {
    return await this.chatModel.findByIdAndUpdate(
      chatId,
      {
        $addToSet: { admins: userId },
      },
      { new: true },
    );
  }

  async deleteAdminFromChat(chatId: string, userId: string) {
    return await this.chatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { admins: userId },
      },
      { new: true },
    );
  }
}
