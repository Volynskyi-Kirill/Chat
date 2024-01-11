import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageDBModule } from './message.db';

@Module({
  imports: [
    MessageDBModule,
    // ClientsModule.register([
    //   {
    //     name: 'MESSAGE_SERVICE',
    //     transport: Transport.REDIS,
    //     options: {
    //       host: 'localhost',
    //       port: 6379,
    //     },
    //   },
    // ]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
