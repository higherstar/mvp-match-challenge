// Dependencies
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Product entity
import { Product } from './product.entity';
import { User } from '../user/user.entity';

// DTOs
import { CreateProductDto, UpdateProductDto } from './product.dto';

// Constants
import { PRODUCT_NOT_FOUND } from '../../shared/constants/strings.constants';
import { Roles } from '../../shared/constants/global.constants';

/**
 * Export product service
 *
 * @class ProductService
 * */
@Injectable()
export class ProductService {
  /**
   * @constructor
   *
   * @param {Repository<Product>} productRepository
   * */
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  /**
   * @member findProductById
   *
   * @param {number} id
   *
   * @returns {Promise<Product>}
   * */
  async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    return product;
  }

  /**
   * Check current user is seller that created this product
   *
   * @member checkRight
   *
   * @param {User} user
   * @param {number} productId
   * */
  async checkRight(user: User, productId: number): Promise<boolean> {
    const product = await this.findProductById(productId);

    return user.role === Roles.SELLER && product && user.id === product.seller.id;
  }

  /**
   * @member create
   *
   * @param {CreateProductDto} createProductDto
   *
   * @returns {Promise<Product>}
   * */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(createProductDto);
  }

  /**
   * @member read
   *
   * @param {number} productId
   *
   * @returns {Promise<Product>}
   * */
  async read(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne(productId, {
      relations: ['seller'],
    });

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    return product;
  }

  /**
   * @member updateProduct
   *
   * @param {number} userId
   * @param {UpdateProductDto} updateProductDto
   *
   * @returns {Promise<UpdateResult>}
   * */
  async updateProduct(userId: number, updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    return this.productRepository.update(userId, updateProductDto);
  }

  /**
   * @member deleteProduct
   *
   * @param {number} productId
   *
   * @returns {Promise<DeleteResult>}
   * */
  async deleteProduct(productId: number): Promise<DeleteResult> {
    return this.productRepository.delete(productId);
  }
}
