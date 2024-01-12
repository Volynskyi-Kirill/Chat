import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageDBModule } from './message.db';

@Module({
  imports: [MessageDBModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
