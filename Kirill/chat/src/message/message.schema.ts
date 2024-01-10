import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../user/user.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true })
  sender: string;
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // from: User;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ required: true })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
