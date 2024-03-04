import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const FROM_EMAIL = configService.get<string>('FROM_EMAIL');
const MAIL_SERVER = 'smtp.gmail.com';
const MAIL_TOKEN = configService.get<string>('MAIL_TOKEN');
export const SETTINGS = {
  host: MAIL_SERVER,
  port: 465,
  secure: true,
  logger: true,
  auth: {
    user: FROM_EMAIL,
    pass: MAIL_TOKEN,
  },
};
