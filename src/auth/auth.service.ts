import { ForbiddenException, Injectable, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcryt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginDTO } from 'src/dto/login.dto';
import { RegisterDTO } from 'src/dto/register.dto';
import { CreateUserDTO } from 'src/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDTO: LoginDTO) {
    const user = await this.validateUser(loginDTO.email, loginDTO.password);

    if (!user) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async signUp(registerDTO: RegisterDTO) {
    let user = await this.usersService.findUserByEmail(registerDTO.email);

    if (user) throw new UnauthorizedException('Email has already been used.');

    if (registerDTO.password !== registerDTO.passwordConfirmation)
      throw new ForbiddenException('Password confirmation failed.');

    const data = new CreateUserDTO();
    data.email = registerDTO.email;
    data.password = registerDTO.password;

    user = await this.usersService.createUser(data);

    if (!user) throw new NotImplementedException('User creation failed.');

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcryt.compare(password, user.password))) {
      delete user.password;

      return user;
    }

    return null;
  }
}
