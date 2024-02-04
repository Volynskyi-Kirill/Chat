import { SetMetadata } from '@nestjs/common';

export const IS_MESSAGE_OWNER_KEY = 'isMessageOwner';
export const MessageOwner = () => SetMetadata(IS_MESSAGE_OWNER_KEY, true);
