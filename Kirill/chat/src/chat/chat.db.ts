import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './chat.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DB_CONNECTION_NAME = 'chat';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECTION_STRING_CHAT'),
      }),
      connectionName: DB_CONNECTION_NAME,
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(
      [{ name: Chat.name, schema: ChatSchema }],
      DB_CONNECTION_NAME,
    ),
  ],
})
export class ChatDBModule {}
