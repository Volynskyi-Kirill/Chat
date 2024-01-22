import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { REDIS_SERVICE } from '../modules/redis.module';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { MESSAGE_EVENTS } from 'chat-utils';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REDIS_SERVICE) private client: ClientProxy,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // handleCreateUser(createUserDto: CreateUserDto) {
  //   this.client.emit(MESSAGE_EVENTS.CREATE_USER, createUserDto);
  // }

  // generateToken(userId: string, username: string, email: string) {
  //   const secret = this.configService.get('JWT_SECRET');
  //   return this.jwtService.sign({ userId, username, email }, { secret });
  // }
}
