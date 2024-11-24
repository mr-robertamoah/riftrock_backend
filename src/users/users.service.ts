import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { MakeAdminDTO } from 'src/dto/make-admin.dto';
import { User } from '@prisma/client';
import { CreateAnotherUserDTO } from 'src/dto/create-another-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

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

  async createAnotherUser(
    user,
    createUserDTO: CreateAnotherUserDTO,
  ): Promise<User> {
    user = await this.prisma.user.findFirst({
      where: { id: Number(user.userId) },
    });

    if (user.role == 'USER')
      throw new ForbiddenException('You cannot create another user account.');

    let otherUser = await this.findUserByEmail(createUserDTO.email);

    if (otherUser)
      throw new UnauthorizedException('Email has already been used.');

    if (createUserDTO.password !== createUserDTO.passwordConfirmation)
      throw new ForbiddenException('Password confirmation failed.');

    const data = new CreateUserDTO();
    data.email = createUserDTO.email;
    data.password = createUserDTO.password;

    otherUser = await this.createUser(data);

    if (!otherUser) throw new NotImplementedException('User creation failed.');

    return user;
  }

  async makeAdmin(admin, makeAdminDTO: MakeAdminDTO): Promise<User> {
    const checkAdmin = await this.prisma.user.findFirst({
      where: { id: admin.userId },
    });

    if (checkAdmin.role == 'USER')
      throw new UnauthorizedException('You cannot make a user an admin.');

    let user = await this.prisma.user.findFirst({
      where: { id: Number(makeAdminDTO.userId) },
    });

    if (!user) throw new NotFoundException('User not found.');
    if (user.id == checkAdmin.id)
      throw new UnauthorizedException('You cannot update your own role.');

    if (user.role == 'ADMIN')
      throw new ForbiddenException('User is already an administrator.');

    user = await this.prisma.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' },
    });

    delete user.password;

    return user;
  }

  async makeUser(superAdmin, makeAdminDTO: MakeAdminDTO): Promise<User> {
    const checkAdmin = await this.prisma.user.findFirst({
      where: { id: superAdmin.userId },
    });

    if (checkAdmin.role !== 'SUPER_ADMIN')
      throw new UnauthorizedException('You cannot make an admin a user.');

    let user = await this.prisma.user.findFirst({
      where: { id: Number(makeAdminDTO.userId) },
    });

    if (!user) throw new NotFoundException('User not found.');
    if (user.id == checkAdmin.id)
      throw new UnauthorizedException('You cannot update your own role.');

    if (user.role == 'USER')
      throw new ForbiddenException('User is not an administrator.');

    user = await this.prisma.user.update({
      where: { id: user.id },
      data: { role: 'USER' },
    });

    delete user.password;

    return user;
  }

  async updateUser(user, updateUserDTO: UpdateUserDTO): Promise<User> {
    user = await this.prisma.user.findFirst({
      where: { id: user.userId },
    });
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

    user = await this.prisma.user.update({
      where: { id: user.id },
      data,
    });

    delete user.password;

    return user;
  }
}
