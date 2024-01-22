import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Connection } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { REDIS_SERVICE } from '../modules/redis.module';
import { ClientProxy } from '@nestjs/microservices';

export const ERROR_MESSAGE = {
  USER_NOT_FOUND: 'such user does not exist',
};

interface ISendMessage {
  email: string;
  subject: string;
  html: string;
}

@Injectable()
export class UserService {
  private userModel;
  constructor(
    @Inject(REDIS_SERVICE) private client: ClientProxy,
    @InjectConnection('user') private readonly connection: Connection,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.userModel = this.connection.model<UserDocument>(User.name);
  }

  generateToken(userId: string, username: string, email: string) {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.sign({ userId, username, email }, { secret });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);

    return user;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async createLink(token: string) {
    const clientUrl = this.configService.get('CLIENT_URL');
    const link = `${clientUrl}/auth/${token}`;
    return `<p><a href="${link}">Войти в аккаунт</a></p>`;
  }

  async sendLink({ email, html, subject }: ISendMessage) {
    this.client.emit('sendMail', { email, html, subject });
  }
}
