import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_CHAT_OWNER_KEY } from '../decorators/chatOwner.decorator';
import { MessageService } from '../message.service';

@Injectable()
export class ChatOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private messageService: MessageService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isOwnerRequired = this.reflector.get<boolean>(
      IS_CHAT_OWNER_KEY,
      context.getHandler(),
    );

    if (!isOwnerRequired) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const { params } = context.getArgByIndex(0);

    const userId = user.userId;
    const messageId = params.id;
    const { chatId } = await this.messageService.findById(messageId);
    const { createdBy } = await this.messageService.getChatById(chatId);
    console.log('createdBy: ', createdBy);
    // const isUserChatOwner = createdBy === userId;

    // if (!isUserChatOwner) {
    //   throw new ForbiddenException();
    // }
    return true;
  }
}
