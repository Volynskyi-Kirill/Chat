import { SetMetadata } from '@nestjs/common';

export const IS_CHAT_MEMBER_KEY = 'isChatMember';
export const ChatMember = () => SetMetadata(IS_CHAT_MEMBER_KEY, true);
