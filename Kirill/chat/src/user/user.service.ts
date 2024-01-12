import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Connection } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  private userModel;
  constructor(
    @InjectConnection('user') private readonly connection: Connection,
  ) {
    this.userModel = this.connection.model(User.name);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
