import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from '../modules/redis.module';
import { Message } from './message.schema';

@Injectable()
export class MessageService {
  private messageModel;
  constructor(
    @InjectConnection('message') private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private client: ClientProxy,
  ) {
    this.messageModel = this.connection.model(Message.name);
  }

  create(createMessageDto: CreateMessageDto) {
    return this.messageModel.create(createMessageDto);
  }

  sendMessage(message: Message) {
    this.client.emit('sendMessage', message);
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
