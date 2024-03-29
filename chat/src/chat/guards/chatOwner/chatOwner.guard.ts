import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_CHAT_OWNER_KEY } from '../../decorators/chatOwner.decorator';
import { ChatService } from '../../chat.service';

@Injectable()
export class ChatOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private chatService: ChatService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isOwnerRequired = this.reflector.get<boolean>(
      IS_CHAT_OWNER_KEY,
      context.getHandler(),
    );

    if (!isOwnerRequired) {
      return true;
    }

    const { userId } = context.switchToHttp().getRequest().user;
    const chatId =
      context.switchToHttp().getRequest().params.chatId ??
      context.switchToHttp().getRequest().body.chatId;
    const { createdBy } = await this.chatService.findById(chatId);
    const isUserChatOwner = createdBy === userId;

    if (!isUserChatOwner) {
      throw new ForbiddenException();
    }
    return true;
  }
}
