import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Chat } from './chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';

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

  getUserChats(userId: string) {
    return this.chatModel
      .find({ users: userId })
      .select('_id')
      .then((chats) => chats.map((chat) => chat._id.toString()));
  }
}
