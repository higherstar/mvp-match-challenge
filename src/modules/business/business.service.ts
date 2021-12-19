// Dependencies
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Entities
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

// DTOs
import { ProductDto, DepositDto, PurchaseDto } from './business.dto';

// Constants
import { NOT_ENOUGH_DEPOSIT } from '../../shared/constants/strings.constants';

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
   * @param {Repository<User>} userRepository
   * @param {Repository<Product>} productRepository
   * */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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
   * @member purchase
   *
   * @param {ProductDto} purchaseDto
   * @param {User} user
   *
   * @returns {any} Promise
   * */
  async purchase(purchaseDto: PurchaseDto, user: User): Promise<any> {
    const productIds = purchaseDto.products.map((p) => p.id);

    if (productIds.length <= 0) {
      throw new BadRequestException('Product id is not empty!');
    }

    for (const id of productIds) {
      if (!purchaseDto.products.filter((p) => p.id === id)[0].quantity === undefined) {
        throw new BadRequestException('Quantity is not empty!');
      }
    }

    let products = (await this.productRepository.findByIds(productIds)) as any;

    products = products.map((p) => ({
      ...p,
      quantity: purchaseDto.products.filter((pp) => pp.id === p.id)[0].quantity,
    }));

    for (const product of products) {
      if (product.amountAvailable - product.quantity < 0) {
        throw new BadRequestException(`Sorry! There are not enough amount of ${product.productName} in the store.`);
      }
    }

    const totalPrice = products.reduce((total, p) => total + p.cost * p.quantity, 0);

    if (user.deposit < totalPrice) {
      throw new BadRequestException(NOT_ENOUGH_DEPOSIT);
    } else {
      await this.userRepository.update(user.id, { deposit: 0 });
    }

    for (const p of products) {
      await this.productRepository.update(p.id, { amountAvailable: p.amountAvailable - p.quantity });
    }

    let change = user.deposit - totalPrice;

    const changes = [];

    if (change / 100 >= 1) {
      for (let i = 0; i < Math.floor(change / 100); i++) {
        changes.push(100);
      }

      change = change % 100;
    }

    if (change / 50 >= 1) {
      changes.push(50);
      change = change % 50;
    }

    if (change / 20 >= 1) {
      for (let i = 0; i < Math.floor(change / 20); i++) {
        changes.push(20);
      }

      change = change % 20;
    }

    if (change / 10 >= 1) {
      changes.push(10);
      change = change % 10;
    }

    if (change / 5 >= 1) {
      changes.push(5);
      changes.push(change % 5);
    }

    return {
      totalPrice,
      products,
      changes,
    };
  }
}
