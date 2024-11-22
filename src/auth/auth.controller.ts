import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDTO } from 'src/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from 'src/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDTO: LoginDTO) {
    return await this.authService.signIn(loginDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() registerDTO: RegisterDTO) {
    return await this.authService.signUp(registerDTO);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('user')
  async getUser(@Request() request) {
    return await this.usersService.findUserByEmail(request.user.email);
  }

  @UseGuards(LocalAuthGuard)
  @Get('logout')
  async signOut(@Request() request) {
    return request.logout();
  }
}
