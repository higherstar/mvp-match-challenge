// Dependencies
import {
  Controller,
  Body,
  Req,
  Post,
  BadRequestException,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { ProductService } from './product.service';

// DTOs
import { CreateProductDto, UpdateProductDto, ProductResponseDto } from './product.dto';
import { BasicSuccessResponseDto, SuccessResponseDto } from '../../shared/DTOs/success-response.dto';

// Entities
import { Product } from './product.entity';

// Interfaces
import { JwtRequest } from '../auth/auth.types';

// Constants
import {
  NOTHING_TO_UPDATE,
  SUCCESS,
  USER_NOT_CREATE_PRODUCT,
  USER_NOT_DELETE_PRODUCT,
  USER_NOT_UPDATE_PRODUCT,
} from '../../shared/constants/strings.constants';
import { Roles } from '../../shared/constants/global.constants';

// Jwt auth guard
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

/**
 * Export product controller
 *
 * @class ProductController
 * */
@ApiTags('products')
@Controller('products')
export class ProductController {
  /**
   * @constructor
   *
   * @param {ProductService} productService
   * */
  constructor(private readonly productService: ProductService) {}

  /**
   * @member create
   *
   * @param {CreateProductDto} createProductDto
   *
   * @param {JwtRequest} req
   * @returns {Promise<Product>}
   * */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Create new product' })
  @ApiResponse({ status: 200, description: 'Success', type: ProductResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Some of the fields are missing or invalid, or email is already used',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to access the resource' })
  create(@Body() createProductDto: CreateProductDto, @Req() req: JwtRequest): Promise<Product> {
    const isSeller = req.user.role === Roles.SELLER;

    if (!isSeller) {
      throw new BadRequestException(USER_NOT_CREATE_PRODUCT);
    }

    return this.productService.create(createProductDto);
  }

  /**
   * @member read
   *
   * @param {number} productId
   *
   * @returns {Promise<SuccessResponseDto<Product>>}
   * */
  @Get(':id')
  @ApiOperation({ description: 'Get a user details' })
  @ApiResponse({ status: 200, description: 'Success', type: ProductResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - The provided user id is missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to access the resource' })
  @ApiResponse({ status: 404, description: 'Not Found - Can not find a user by provided id' })
  async read(@Param('id', ParseIntPipe) productId: number): Promise<SuccessResponseDto<Product>> {
    const product = await this.productService.read(productId);

    return {
      message: SUCCESS,
      data: product,
    };
  }

  /**
   * @member update
   *
   * @param {number} productId
   * @param {UpdateProductDto} updateProductDto
   *
   * @param {JwtRequest} req
   * @returns {Promise<BasicSuccessResponseDto>}
   * */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Update product name, role or deposit' })
  @ApiResponse({ status: 200, description: 'Success', type: BasicSuccessResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - The provided product id is missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to access the resource' })
  @ApiResponse({ status: 404, description: 'Not Found - Can not find a product by provided id' })
  async update(
    @Param('id', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: JwtRequest,
  ): Promise<SuccessResponseDto<Product>> {
    if (Object.keys(updateProductDto).length === 0) {
      return { message: NOTHING_TO_UPDATE };
    }

    const hasRight = await this.productService.checkRight(req.user, productId);

    if (!hasRight) {
      throw new BadRequestException(USER_NOT_UPDATE_PRODUCT);
    }

    await this.productService.updateProduct(productId, updateProductDto);

    return { message: SUCCESS };
  }

  /**
   * @member delete
   *
   * @param {number} productId
   * @param {JwtRequest} req
   *
   * @returns {Promise<BasicSuccessResponseDto>}
   * */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Success', type: BasicSuccessResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - The provided product id is missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to access the resource' })
  @ApiResponse({ status: 404, description: 'Not Found - Can not find a product by provided id' })
  async delete(@Param('id', ParseIntPipe) productId: number, @Req() req: JwtRequest): Promise<BasicSuccessResponseDto> {
    const hasRight = await this.productService.checkRight(req.user, productId);

    if (!hasRight) {
      throw new BadRequestException(USER_NOT_DELETE_PRODUCT);
    }

    await this.productService.deleteProduct(productId);

    return { message: SUCCESS };
  }
}
