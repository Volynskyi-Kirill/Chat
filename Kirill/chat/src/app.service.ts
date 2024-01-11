import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    @Inject('MESSAGE_SERVICE') private messageClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUserById(id: string) {
    this.messageClient.send({ cmd: 'get' }, id);
    return this.userClient.send({ cmd: 'get' }, id);
  }
}
