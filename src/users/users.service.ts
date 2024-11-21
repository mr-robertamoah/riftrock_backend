import { Injectable } from '@nestjs/common';

export type User = any;
@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      firstName: 'Robert',
      lastName: 'Amoah',
      otherNames: '',
      email: '',
      password: '',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email == email);
  }
}
