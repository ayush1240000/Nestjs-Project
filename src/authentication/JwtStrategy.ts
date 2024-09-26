import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { usersService } from 'src/DatabaseEntity/users/users.service';
import { error } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: usersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret_key',
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.username);
    if (!user) {
      throw error('User not found');
    }
    return { userId: payload.sub, username: payload.username , roles: payload.role};
  }
}
