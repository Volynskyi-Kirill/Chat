import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DB_CONNECTION_NAME = 'message';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECTION_STRING_MESSAGE'),
      }),
      connectionName: DB_CONNECTION_NAME,
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(
      [{ name: Message.name, schema: MessageSchema }],
      DB_CONNECTION_NAME,
    ),
  ],
})
export class MessageDBModule {}
