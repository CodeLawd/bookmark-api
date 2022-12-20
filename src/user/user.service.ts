import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return {
      count: users.length,
      data: users.map((user) => {
        if (user.password) delete user.password;
        return user;
      }),
    };
  }
}
