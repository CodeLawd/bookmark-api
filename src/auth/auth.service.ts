import { AuthDTO, LoginDTO } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: AuthDTO) {
    const { email, password, firstName, lastName } = dto;

    // Hash the password
    const hash = await argon.hash(password);

    // Store the user in the databse
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        firstName,
        lastName,
      },
    });

    delete user.password;

    return user;
  }

  async login(dto: LoginDTO) {
    const { email, password } = dto;
    
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new ForbiddenException('Invalid Credentials');

    const isMatch = await argon.verify(user.password, password);
    if (!isMatch) throw new ForbiddenException('Invalid Credentials');

    return 'I am logged in';
  }
}
