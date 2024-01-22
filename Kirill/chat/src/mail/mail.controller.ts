import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { EventPattern } from '@nestjs/microservices';
import { ISendMessage } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern('sendMail')
  handleSendMail({ email, html, subject }: ISendMessage) {
    this.mailService.sendMessage({ email, html, subject });
  }
}
