import { Transport } from '@nestjs/microservices';

export const connectMicroserviceConfig = {
  transport: Transport.REDIS,
  options: {
    port: 6379,
  },
};
