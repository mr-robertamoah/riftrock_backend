import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ServicesService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}
}
