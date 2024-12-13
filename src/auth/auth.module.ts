import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { UserService } from 'src/users/user.service';
import { AuthGuard } from './guard/auth.guard';
import { UserModule } from 'src/users/user.module';
import { jwtConstants } from './const/constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
