import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcryt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginDTO } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDTO: LoginDTO) {
    console.log(loginDTO);
    const user = await this.validateUser(loginDTO.email, loginDTO.password);

    if (!user) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && (await bcryt.compare(password, user.password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
