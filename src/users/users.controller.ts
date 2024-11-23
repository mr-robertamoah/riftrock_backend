import { Body, Controller, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // TODO implement make admin
  // TODO implement unmake admin

  @Patch('update')
  async updateUserInfo(@Body() updateUserDTO: UpdateUserDTO) {
    return await this.usersService.updateUser(updateUserDTO);
  }
}
