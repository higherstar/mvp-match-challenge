// Dependencies
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// User entity
import { User } from './user.entity';

// User dto
import { CreateUserDto, UpdateUserDto } from './user.dto';

// Constants
import { USER_NOT_FOUND } from '../../shared/constants/strings.constants';

/**
 * Export user service
 *
 * @class UserService
 * */
@Injectable()
export class UserService {
  /**
   * @constructor
   *
   * @param {Repository<User>} userRepository
   * */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * @member findUserById
   *
   * @param {number} id
   *
   * @returns {Promise<User>}
   * */
  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['products']
    });

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
    return await this.userRepository.save(createUserDto);
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

    return this.userRepository.update(userId, updateUserDto);
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

    return this.userRepository.delete(userId);
  }
}
