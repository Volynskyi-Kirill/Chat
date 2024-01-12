import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUserById(id: string) {
    this.client.emit('user:test', id);
  }
}
