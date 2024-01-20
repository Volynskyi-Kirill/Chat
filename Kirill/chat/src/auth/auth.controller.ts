import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.handleCreateUser(createUserDto);
  }
}
