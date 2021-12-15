// Dependencies
import crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { ILike, Repository } from 'typeorm';

import { AuthResponseDto, LoginDataDto, MeDataDto, RegisterDataDto } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

/**
 * Export auth service
 *
 * @class AuthService
 * */
@Injectable()
export class AuthService {
  /**
   * @constructor
   *
   * @param {Repository<User>} usersRepository
   * @param {JwtService} jwtService
   * */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @member login
   *
   * @param {LoginDataDto} loginData
   *
   * @returns {Promise<AuthResponseDto>}
   * */
  async login(loginData: LoginDataDto): Promise<AuthResponseDto> {
    const passwordHash = crypto.createHmac('sha256', loginData.password).digest('hex');

    const user = await this.usersRepository.findOne({
      where: {
        email: ILike(loginData.email),
        password: passwordHash,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateUserJwtToken(user);
  }

  /**
   * @member register
   *
   * @param {RegisterDataDto} registerData
   *
   * @returns {Promise<AuthResponseDto>}
   * */
  async register(registerData: RegisterDataDto): Promise<AuthResponseDto> {
    const user = await this.usersRepository.save(registerData);

    return this.generateUserJwtToken(user);
  }

  /**
   * @member me
   *
   * @param {MeDataDto} meData
   *
   * @returns
   * */
  async me(meData: MeDataDto): Promise<AuthResponseDto> {
    const { user } = await this.jwtService.decode(meData.token) as { user: User };

    return this.generateUserJwtToken(user);
  }

  /**
   * @member generateUserJwtToken
   *
   * @param {User} user
   *
   * @returns {Promise<AuthResponseDto>}
   * */
  async generateUserJwtToken(user: User): Promise<AuthResponseDto> {
    const data = { ...classToPlain(user) };

    const payload = {
      user: {
        id: data.id,
        role: data.role,
        email: data.email,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: 3600, //1h
      }),
      ...payload,
    };
  }
}
