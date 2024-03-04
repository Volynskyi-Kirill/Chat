import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_CHAT_MEMBER_KEY } from '../../decorators/chatMember.decorator';
import { ChatService } from '../../chat.service';

@Injectable()
export class ChatMemberGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private chatService: ChatService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isMemberRequired = this.reflector.get<boolean>(
      IS_CHAT_MEMBER_KEY,
      context.getHandler(),
    );

    if (!isMemberRequired) {
      return true;
    }

    const { userId } = context.switchToHttp().getRequest().user;
    const chatId = context.switchToHttp().getRequest().params.chatId;
    const { users } = await this.chatService.findById(chatId);
    const isUserChatMember = users.includes(userId);

    if (!isUserChatMember) {
      throw new ForbiddenException();
    }
    return true;
  }
}
