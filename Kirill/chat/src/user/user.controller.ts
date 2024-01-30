import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/registration')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const { _id, username, email } = user;
    return this.userService.generateToken(_id.toString(), username, email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('link')
  async sendLink(@Body('mail') mail: string) {
    const { _id, username, email } = await this.userService.findByEmail(mail);
    const token = this.userService.generateToken(
      _id.toString(),
      username,
      email,
    );
    const html = await this.userService.createLink(token);
    this.userService.sendLink({ email, html, subject: 'Magic link' });
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
