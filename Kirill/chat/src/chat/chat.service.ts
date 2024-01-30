import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Chat } from './chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { AddUserToChatDto } from './dto/add-user-to-chat.dto';

@Injectable()
export class ChatService {
  private chatModel;
  constructor(
    @InjectConnection('chat') private readonly connection: Connection,
  ) {
    this.chatModel = this.connection.model(Chat.name);
  }
  create(createChatDto: CreateChatDto) {
    return this.chatModel.create(createChatDto);
  }

  addUserToChat({ chatId, userId }: AddUserToChatDto) {
    return this.chatModel.findByIdAndUpdate(chatId, {
      $addToSet: { users: userId },
    });
  }

  deleteUserFromChat(chatId: string, userId: string) {
    return this.chatModel.findByIdAndUpdate(chatId, {
      $pull: { users: userId },
    });
  }

  getUserChats(userId: string) {
    return this.chatModel
      .find({ users: userId })
      .select('_id')
      .then((chats) => chats.map((chat) => chat._id.toString()));
  }
}
