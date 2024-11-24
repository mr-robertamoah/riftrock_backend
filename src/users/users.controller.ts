import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { MakeAdminDTO } from 'src/dto/make-admin.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAnotherUserDTO } from 'src/dto/create-another-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('make-admin')
  async makeUserAdmin(@Request() request, @Body() makeAdminDTO: MakeAdminDTO) {
    return await this.usersService.makeAdmin(request.user, makeAdminDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('make-user')
  async makeAdminUser(@Request() request, @Body() makeAdminDTO: MakeAdminDTO) {
    return await this.usersService.makeUser(request.user, makeAdminDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createAnotherUser(
    @Request() request,
    @Body() createAnotherUserDTO: CreateAnotherUserDTO,
  ) {
    return await this.usersService.createAnotherUser(
      request.user,
      createAnotherUserDTO,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateUserInfo(
    @Request() request,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return await this.usersService.updateUser(request.user, updateUserDTO);
  }
}
