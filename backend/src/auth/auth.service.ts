import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
constructor(
  private readonly usersService: UsersService,
  private readonly jwtService: JwtService,
) {}

  async register(registerDto: RegisterDto) {
    const existingUser =
      await this.usersService.findByEmail(
        registerDto.email,
      );

    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      10,
    );

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    const { password, ...result } = user;

    return {
      message: 'User registered successfully',
      user: result,
    };
  }
  async login(loginDto: LoginDto) {
  const user = await this.usersService.findByEmail(
    loginDto.email,
  );

  if (!user) {
    throw new UnauthorizedException(
      'Invalid credentials',
    );
  }

  const isPasswordMatched =
    await bcrypt.compare(
      loginDto.password,
      user.password,
    );

  if (!isPasswordMatched) {
    throw new UnauthorizedException(
      'Invalid credentials',
    );
  }

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken =
    await this.jwtService.signAsync(payload);

  return {
    access_token: accessToken,
  };
}
}