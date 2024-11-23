import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

export type User = any;
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    delete user.password;

    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

    const user = await this.prisma.user.create({
      data: { email: createUserDTO.email, password: hashedPassword },
    });

    delete user.password;

    return user;
  }

  async updateUser(updateUserDTO: UpdateUserDTO): Promise<User> {
    const data = new UpdateUserDTO();

    if (updateUserDTO.firstName) data.firstName = updateUserDTO.firstName;
    if (updateUserDTO.lastName) data.lastName = updateUserDTO.lastName;
    if (updateUserDTO.otherNames) data.otherNames = updateUserDTO.otherNames;

    if (
      updateUserDTO.password &&
      updateUserDTO.password !== updateUserDTO.passwordConfirmation
    )
      throw new ForbiddenException('Password confirmation failed.');

    if (updateUserDTO.password) {
      data.password = await bcrypt.hash(updateUserDTO.password, 10);
      delete data.passwordConfirmation;
    }

    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data,
    });

    delete user.password;

    return user;
  }
}
