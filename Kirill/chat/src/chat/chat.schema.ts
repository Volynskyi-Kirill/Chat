import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop()
  users: string[];
  @Prop()
  admins: string[];
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  createdBy: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
