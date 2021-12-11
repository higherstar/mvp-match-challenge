// Dependencies
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// User entity
import { User } from './users.entity';

// User dto
import { CreateUserDto, UpdateUserDto } from './users.dto';

// Constants
import { USER_NOT_FOUND } from '../../shared/constants/strings.constants';

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
   * @member findUserById
   *
   * @param {number} id
   *
   * @returns {Promise<User>}
   * */
  async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  /**
   * @member create
   *
   * @param {CreateUserDto} createUserDto
   *
   * @returns {Promise<User>}
   * */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto);
  }

  /**
   * @member updateUser
   *
   * @param {number} userId
   * @param {UpdateUserDto} updateUserDto
   *
   * @returns {Promise<UpdateResult>}
   * */
  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    // will throw a Not Found Exception if user does not exists
    await this.findUserById(userId);

    return this.usersRepository.update(userId, updateUserDto);
  }

  /**
   * @member deleteUser
   *
   * @param {number} userId
   *
   * @returns {Promise<DeleteResult>}
   * */
  async deleteUser(userId: number): Promise<DeleteResult> {
    // will throw a Not Found Exception if user does not exists
    await this.findUserById(userId);

    return this.usersRepository.delete(userId);
  }
}
