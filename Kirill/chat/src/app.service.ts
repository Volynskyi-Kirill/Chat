import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    // @Inject('MESSAGE_SERVICE') private messageClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUserById(id: string) {
    this.userClient.emit('user:test', id);
    this.userClient.emit('message:test', id);

    // const userRequest = this.userClient.send({ cmd: 'get' }, id);
    // userRequest.subscribe((user) => {
    //   console.log('user: ', user);
    //   return user;
    // });

    // await
    // return await this.userClient.send({ cmd: 'get' }, id);
  }
  // async getUserById(id: string) {
  //   const userRequest = this.userClient.send({ cmd: 'get' }, id);

  //   const user = await lastValueFrom(userRequest);
  //   console.log('user: ', user);
  //   return user;

  //   // const userRequest = this.userClient.send({ cmd: 'get' }, id);
  //   // userRequest.subscribe((user) => {
  //   //   console.log('user: ', user);
  //   //   return user;
  //   // });

  //   // await this.messageClient.send({ cmd: 'get' }, id);
  //   // return await this.userClient.send({ cmd: 'get' }, id);
  // }
}
