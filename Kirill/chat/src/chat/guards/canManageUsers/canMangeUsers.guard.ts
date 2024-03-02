import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_MANAGE_USERS_KEY } from '../../decorators/canManageUsers.decorator';
import { ChatService } from '../../chat.service';

@Injectable()
export class CanMangeUsersGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private chatService: ChatService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isMangeUsersRequired = this.reflector.get<boolean>(
      IS_MANAGE_USERS_KEY,
      context.getHandler(),
    );

    if (!isMangeUsersRequired) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const chatId =
      context.switchToHttp().getRequest().params.chatId ??
      context.switchToHttp().getRequest().body.chatId;

    const userId = user.userId;
    const { createdBy } = await this.chatService.findById(chatId);
    const admins = await this.chatService.getChatAdmins(chatId);

    const isUserChatAdmin = admins?.includes(userId);
    const isUserChatOwner = createdBy === userId;

    if (!isUserChatOwner && !isUserChatAdmin) {
      throw new ForbiddenException();
    }
    return true;
  }
}


