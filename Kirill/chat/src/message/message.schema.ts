import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  chatId: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ required: true })
  text: string;

  @Prop({ default: null })
  seenAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
