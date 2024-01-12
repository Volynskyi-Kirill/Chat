/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserDBModule } from './user.db';
import { UserDocument } from './user.schema';
import { Types } from 'mongoose';

// толи я мокаю вообще?
// тесты - это треш, одна борьба с ts. Нужен разбор с примерами, как писать тесты...

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserDBModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  function createUser(userId: Types.ObjectId) {
    return {
      _id: userId,
      username: 'Alex',
      chats: <string[]>[],
    };
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const userId = new Types.ObjectId();
    const createUserDto: CreateUserDto = {
      username: 'Alex',
      chats: [],
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

  // it('should return all users', async () => {
  //   const users: UserDocument[] = [];

  //   jest.spyOn(service, 'findAll').mockImplementation(async function () {
  //     return users as UserDocument[];
  //   });

  //   const result = await service.findAll();

  //   expect(service.findAll).toHaveBeenCalled();
  //   expect(result).toEqual(users);
  // });

  it('should return all users', async () => {
    const users: UserDocument[] = [];

    jest
      .spyOn(service['userModel'], 'find')
      //@ts-ignore
      .mockImplementation(async function () {
        return users as UserDocument[];
      });

    const result = await service.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should return a user by id', async () => {
    const userId = new Types.ObjectId();
    const user = createUser(userId);
    jest.spyOn(service, 'findOne').mockImplementation(async () => {
      return user as UserDocument;
    });

    const result = await service.findOne(userId.toString());

    expect(service.findOne).toHaveBeenCalledWith(userId.toString());
    expect(result).toEqual(user);
  });

  // it('should update a user by id', async () => {
  //   const userId = new Types.ObjectId();
  //   const user = createUser(userId);
  //   const updateUserDto: UpdateUserDto = {
  //     username: 'Felix',
  //     chats: [],
  //   };

  //   jest.spyOn(service, 'update').mockImplementation(async () => {
  //     user = updateUserDto;
  //     return user as UserDocument;
  //   });

  //   const result = await service.update(userId.toString());

  //   expect(service.update).toHaveBeenCalledWith(userId.toString());
  //   expect(result).toEqual(user);
  // });
});
