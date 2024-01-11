import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatDBModule } from './chat.db';

@Module({
  imports: [
    ChatDBModule,
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],

  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
