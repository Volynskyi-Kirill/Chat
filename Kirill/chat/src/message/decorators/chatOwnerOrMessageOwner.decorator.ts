import { SetMetadata } from '@nestjs/common';

export const IS_CHAT_OWNER_OR_MESSAGE_OWNER_KEY = 'isChatOwnerOrMessageOwner';
export const ChatOwnerOrMessageOwner = () =>
  SetMetadata(IS_CHAT_OWNER_OR_MESSAGE_OWNER_KEY, true);
