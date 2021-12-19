// Dependencies
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Like, Repository, UpdateResult, MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Product entity
import { Product } from './product.entity';
import { User } from '../user/user.entity';

// DTOs
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { PaginationParamsDto } from '../../shared/DTOs/pagination.dto';
import { SortOrderDto } from '../../shared/DTOs/sort-order.dto';
import { ListDto } from '../../shared/DTOs/list-dto';

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
   *
   * @returns {Promise<boolean>}
   * */
  async checkRight(user: User, productId: number): Promise<boolean> {
    const product = await this.read(productId);

    return user.role === Roles.SELLER && product && user.id === product.seller.id;
  }

  /**
   * @member create
   *
   * @param {CreateProductDto} createProductDto
   * @param {User} user
   *
   * @returns {Promise<Product>}
   * */
  async create(createProductDto: CreateProductDto, user: User): Promise<Product> {
    return await this.productRepository.save({ ...createProductDto, seller: user });
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
   * @member readAll
   *
   * @param {PaginationParamsDto} paginationParams
   * @param {SortOrderDto} sortOrderDto
   * @param {string} search
   * @param {User} user
   *
   * @returns {Promise<ListDto<Product>>}
   * */
  async readAll(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    search: string = '',
    user: User,
  ): Promise<ListDto<Product>> {
    let where: {};

    if (user.role === 'buyer') {
      where = {
        productName: Like(`%${search}%`),
        amountAvailable: MoreThan(0),
      };
    } else {
      where = {
        productName: Like(`%${search}%`),
        seller: user.id,
      };
    }

    const [products, totalCount] = await this.productRepository.findAndCount({
      where,
      order: {
        [sortOrderDto.sortBy]: sortOrderDto.order,
      },
      skip: (paginationParams.page - 1) * paginationParams.limit,
      take: paginationParams.limit,
    });

    return {
      listData: products,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / paginationParams.limit),
      },
      sortOrder: sortOrderDto,
    };
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
