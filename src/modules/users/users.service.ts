// Dependencies
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// User entity
import { User } from './users.entity';

// User dto
import { CreateUserDto } from './users.dto';

/**
 * Export users service
 *
 * @class UsersService
 * */
@Injectable()
export class UsersService {
  /**
   * @constructor
   *
   * @param {Repository<User>} usersRepository
   * */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * @member create
   *
   * @param {CreateUserDto} createUserDto
   *
   * @returns {Promise<User>}
   * */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save({
      email: createUserDto.email,
      password: createUserDto.password,
      deposit: createUserDto.deposit,
      role: createUserDto.role,
    });
  }
}
