import { SetMetadata } from '@nestjs/common';

export const IS_MANAGE_USERS_KEY = 'isManageUsers';
export const CanManageUsers = () => SetMetadata(IS_MANAGE_USERS_KEY, true);
