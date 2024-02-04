import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { EventPattern } from '@nestjs/microservices';
import { ISendMessage } from './mail.service';
import { EVENT } from '../shared/constants';
import { Public } from '../shared/decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @EventPattern(EVENT.LINK_CREATED)
  handleLink({ email, html, subject }: ISendMessage) {
    this.mailService.sendMessage({ email, html, subject });
  }
}
