import { CreateUserDto } from './dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserDBModule } from './user.db';
import { UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '../modules/redis.module';
import { Types } from 'mongoose';


describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserDBModule, RedisModule],
      providers: [UserService, JwtService, ConfigService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  function createUser(userId: Types.ObjectId) {
    return {
      _id: userId,
      email: 'email@gmail.com',
      username: 'Alex',
    };
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const userId = new Types.ObjectId();
    const createUserDto: CreateUserDto = {
      username: 'Alex',
      email: 'test@gmail.com',
    };

    jest.spyOn(service, 'create').mockImplementation(async () => {
      const user = createUser(userId);
      return user as UserDocument;
    });

    const result = await service.create(createUserDto);

    expect(service.create).toHaveBeenCalledWith(createUserDto);

    const user = createUser(userId);
    expect(result).toEqual(user);
  });
});
