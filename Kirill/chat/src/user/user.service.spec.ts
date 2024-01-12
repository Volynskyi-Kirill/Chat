import { CreateUserDto } from './dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserDBModule } from './user.db';
import { User } from './user.schema';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserDBModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      username: 'Alex',
      chats: [],
    };

    jest
      .spyOn(service['userModel'], 'create')
      .mockImplementation(async function (
        createUserDto: CreateUserDto,
      ): Promise<User> {
        return Promise.resolve({
          _id: '659ffc043e89b09ee4fa242f',
          username: createUserDto.username,
          chats: createUserDto.chats,
        } as User);
      });

    // jest.spyOn(service['userModel'], 'create').mockImplementation(async () => {
    //   return Promise.resolve({
    //     _id: '659ffc043e89b09ee4fa242f',
    //     username: createUserDto.username,
    //     chats: createUserDto.chats,
    //   } as User);
    
    //   // return { _id: '659ffc043e89b09ee4fa242f', ...createUserDto } as User;
    // });

    const result = await service.create(createUserDto);

    expect(service['userModel'].create).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual({
      _id: '659ffc043e89b09ee4fa242f',
      ...createUserDto,
    });
  });
});
