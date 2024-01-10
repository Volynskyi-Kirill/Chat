import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Message } from '../message/message.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop()
  messages: string[];
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
  // messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
