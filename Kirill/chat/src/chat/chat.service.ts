import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Chat } from './chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatUserDto } from '../shared/dto/chat-user.dto';
import { REDIS_SERVICE } from '../modules/redis.module';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT } from '../shared/constants';

@Injectable()
export class ChatService {
  private chatModel;
  constructor(
    @InjectConnection('chat') private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private client: ClientProxy,
  ) {
    this.chatModel = this.connection.model(Chat.name);
  }
  create(createChatDto: CreateChatDto) {
    return this.chatModel.create(createChatDto);
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
}
