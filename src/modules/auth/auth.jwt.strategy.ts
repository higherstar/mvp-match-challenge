// Dependencies
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Services
import { UsersService } from '../users/users.service';

// Entities
import { User } from '../users/users.entity';

// Interfaces
import { JwtUser } from './auth.types';

/**
 * Export jwt strategy
 *
 * @class JwtStrategy
 * @extends PassportStrategy
 * */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * @constructor
   *
   * @param {UsersService} usersService
   * */
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * @member validate
   *
   * @param {JwtUser} payload
   *
   * @returns {Promise<User>}
   * */
  async validate(payload: JwtUser): Promise<User> {
    const user = await this.usersService.findUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
