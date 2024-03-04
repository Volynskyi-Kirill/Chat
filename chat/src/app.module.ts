import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { PollingModule } from './polling/polling.module';
import { RedisModule } from './modules/redis.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    RedisModule,
    UserModule,
    ChatModule,
    MessageModule,
    PollingModule,
    MailModule,
  ],
})
export class AppModule {}
