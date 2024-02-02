import { JwtGuard } from '../shared/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

export const jwtGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};
