import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from '../modules/redis.module';
import { Message } from './message.schema';
import { EVENT } from '../shared/constants';

@Injectable()
export class MessageService {
  private messageModel;
  constructor(
    @InjectConnection('message') private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private client: ClientProxy,
  ) {
    this.messageModel = this.connection.model(Message.name);
  }

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.messageModel.create(createMessageDto);
    this.client.emit(EVENT.MESSAGE_CREATED, message);

    return message;
  }

  async handleMessageViewed(seenFrom: { chatId: string; messageId: string }) {
    const { messageId } = seenFrom;

    const message = await this.messageModel.findByIdAndUpdate(
      messageId,
      {
        seenAt: Date.now(),
      },
      { new: true },
    );
    this.client.emit('updateMessageViewed', message);
  }

  findAll() {
    return this.messageModel.find();
  }

  findOne(id: string) {
    return this.messageModel.findById(id);
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.messageModel.findByIdAndUpdate(id, updateMessageDto);
  }

  remove(id: string) {
    return this.messageModel.findByIdAndDelete(id);
  }
}
