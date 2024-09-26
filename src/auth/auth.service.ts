import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  signIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.usersService.findUserByNameAndPassword(
      username,
      password,
    );

    const payload = {
      sub: foundUser.id,
      username: foundUser.username,
      roles: foundUser.roles,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }
}
