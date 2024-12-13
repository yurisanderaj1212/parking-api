import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UserService } from 'src/users/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async register({ username, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('user already exist');
    }

    return await this.userService.createUser({
      username,
      email,
      password: await bcryptjs.hash(password, 10)
    })
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);


    return { token, email }

  }

  async profile({ email, role }: { email: string, role: string }) {
    return await this.userService.findOneByEmail(email);
  }

}