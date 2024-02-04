import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_MESSAGE_OWNER_KEY } from '../decorators/messageOwner.decorator';
import { MessageService } from '../message.service';

@Injectable()
export class MessageOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private messageService: MessageService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isOwnerRequired = this.reflector.get<boolean>(
      IS_MESSAGE_OWNER_KEY,
      context.getHandler(),
    );

    if (!isOwnerRequired) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const params = context.switchToHttp().getRequest().params;

    const userIdFromRequest = user.userId;
    const messageId = params.id;
    const { userId } = await this.messageService.findById(messageId);

    const isUserMessageOwner = userId === userIdFromRequest;

    if (!isUserMessageOwner) {
      throw new ForbiddenException();
    }
    return true;
  }
}
