import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from '../modules/redis.module';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { MESSAGE_EVENTS } from 'chat-utils';

@Injectable()
export class AuthService {
  constructor(@Inject(REDIS_SERVICE) private client: ClientProxy) {}

  handleCreateUser(createUserDto: CreateUserDto) {
    this.client.emit(MESSAGE_EVENTS.CREATE_USER, createUserDto);
  }
}
