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
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDTO: Record<string, any>) {
    return await this.authService.signIn(signInDTO.email, signInDTO.password);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async getUser(@Request() request) {
    return request.user;
  }
}
