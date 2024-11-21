import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/createuser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export type User = any;
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

    const user = await this.prisma.user.create({
      data: { email: createUserDTO.email, password: hashedPassword },
    });

    delete user.password;

    return user;
  }
}
