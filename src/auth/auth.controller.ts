import { Controller, Post, UseGuards, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from './enums/role.enum';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request {
  user: {
    email: string;
    role: string;
  }
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }


  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.Client)
  profile(@Request() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }

}