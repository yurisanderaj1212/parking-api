import { Controller, Post, UseGuards, Body, Get , Request } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


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
  @UseGuards(AuthGuard)
  profile(
    @Request() req,
  ) {
    return req.user;
  }

}