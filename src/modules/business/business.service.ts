// Dependencies
import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Entities
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

// DTOs
import { BuyDto, DepositDto } from './business.dto';

/**
 * Export business service
 *
 * @class BusinessService
 * */
@Injectable()
export class BusinessService {
  /**
   * @constructor
   *
   * */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * @member deposit
   *
   * @param {User} user
   * @param {DepositDto} depositDto
   *
   * @returns {Promise<Product>}
   * */
  async deposit(user: User, depositDto: DepositDto): Promise<number> {
    await this.userRepository.update(user.id, { deposit: depositDto.value + user.deposit });

    const updatedUser = await this.userRepository.findOne(user.id);

    return updatedUser.deposit;
  }

  /**
   * @member reset
   *
   * @param {number} userId
   *
   * @returns {Promise<UpdateResult>}
   * */
  async reset(userId: number): Promise<UpdateResult> {
    return this.userRepository.update(userId, { deposit: 0 });
  }

  /**
   * @member buy
   *
   * @param {BuyDto} buyDtos
   * @param {User} user
   * */
  async buy(buyDtos: BuyDto[], user: User) {
    // const product = await this.productService.read(buyDto.productId);
    // if (product.amountAvailable < buyDto.productAmount) {
    //   return { message: 'There are no products you required amount!' }
    // }
    //
    // if (user.deposit < buyDto.productAmount * product.cost) {
    //   return { message: 'There are no enough deposit to buy product!' }
    // }
  }
}
