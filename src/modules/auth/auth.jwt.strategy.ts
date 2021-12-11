// Dependencies
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Services
import { UserService } from '../user/user.service';

// Entities
import { User } from '../user/user.entity';

// Interfaces
import { JwtPayload } from './auth.types';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
   * @param {UserService} userRepository
   * */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: process.env.NODE_ENV === 'dev',
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * @member validate
   *
   * @param {JwtPayload} payload
   *
   * @returns {Promise<User>}
   * */
  async validate(payload: JwtPayload): Promise<User> {
    // Get user from payload user id
    const user = await this.userRepository.findOne(payload.user.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
