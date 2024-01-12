import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatDBModule } from './chat.db';

@Module({
  imports: [ChatDBModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
