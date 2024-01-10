import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Chat } from '../chat/chat.schema';
// import { Roles } from './utils/user.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  chats: string[];
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }] })
  // chats: Chat[];

  //   @Prop({
  //     required: true,
  //     type: [{ type: String, enum: Roles }],
  //   })
  //   roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
