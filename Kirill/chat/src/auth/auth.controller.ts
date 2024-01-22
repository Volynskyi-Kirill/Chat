import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async sendLink(@Body() email: string) {
    
  }

  // @Post('/registration')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.handleCreateUser(createUserDto);
  // }
}
