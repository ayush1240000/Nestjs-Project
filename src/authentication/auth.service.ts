import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { usersService } from '../DatabaseEntity/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: usersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    return this.userService.validateUser(username, pass);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId ,role :user.role};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
