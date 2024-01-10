import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './chat.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/chat'),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],`
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('CHAT_DB'),
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],

  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
