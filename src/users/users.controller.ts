import { Body, Controller, Patch, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { MakeAdminDTO } from 'src/dto/make-admin.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // TODO implement make admin
  // TODO implement unmake admin

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async makeUserAdmin(@Request() request, @Body() makeAdminDTO: MakeAdminDTO) {
    return await this.usersService.makeAdmin(request.user, makeAdminDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async makeAdminUser(@Request() request, @Body() makeAdminDTO: MakeAdminDTO) {
    return await this.usersService.makeUser(request.user, makeAdminDTO);
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
