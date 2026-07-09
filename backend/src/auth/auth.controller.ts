import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { RolesGuard } from './guards/roles.guard';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(
      registerDto,
    );
  }
  @Post('login')
login(
  @Body() loginDto: LoginDto,
) {
  return this.authService.login(loginDto);
}
@Get('profile')
@UseGuards(JwtAuthGuard)
profile(
  @Req() req,
) {
  return req.user;
}
@Get('owner')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(UserRole.OWNER)
ownerRoute() {
  return {
    message:
      'Only owners can access this route',
  };
}
}