import { SetMetadata } from '@nestjs/common';

export const IS_CAN_DELETE_MESSAGE_KEY = 'isCanDeleteMessage';
export const canDeleteMessage = () =>
  SetMetadata(IS_CAN_DELETE_MESSAGE_KEY, true);
