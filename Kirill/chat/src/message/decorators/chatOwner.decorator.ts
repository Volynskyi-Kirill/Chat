import { SetMetadata } from '@nestjs/common';

export const IS_CHAT_OWNER_KEY = 'isChatOwner';
export const ChatOwner = () => SetMetadata(IS_CHAT_OWNER_KEY, true);
