import { JwtGuard } from '../guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

// похоже это лишние, потому что мы его должны в отдельный микросервис отдельнро импортировать

export const jwtGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};
