import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_CAN_DELETE_MESSAGE_KEY } from '../decorators/canDeleteMessage.decorator';
import { MessageService } from '../message.service';

@Injectable()
export class canDeleteMessageGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private messageService: MessageService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isOwnerRequired = this.reflector.get<boolean>(
      IS_CAN_DELETE_MESSAGE_KEY,
      context.getHandler(),
    );

    if (!isOwnerRequired) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const params = context.switchToHttp().getRequest().params;

    const userIdFromRequest = user.userId;
    const messageId = params.id;
    const { chatId, userId } = await this.messageService.findById(messageId);
    const { createdBy } = await this.messageService.getChatById(chatId);

    const isUserChatOwner = createdBy === userIdFromRequest;
    const isUserMessageOwner = userId === userIdFromRequest;

    if (!isUserChatOwner && !isUserMessageOwner) {
      throw new ForbiddenException();
    }
    return true;
  }
}
