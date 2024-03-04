import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDBModule } from './user.db';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '../modules/redis.module';

@Module({
  imports: [UserDBModule, RedisModule],
  controllers: [UserController],
  providers: [UserService, JwtService, ConfigService],
})
export class UserModule {}
