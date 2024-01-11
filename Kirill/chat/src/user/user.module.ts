import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserDBModule } from './user.db';

@Module({
  imports: [
    UserDBModule,
    // ClientsModule.register([
    //   {
    //     name: 'USER_SERVICE',
    //     transport: Transport.REDIS,
    //     options: {
    //       host: 'localhost',
    //       port: 6379,
    //     },
    //   },
    // ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
