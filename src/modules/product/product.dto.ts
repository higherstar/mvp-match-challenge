// Dependencies
import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

// Entities
import { Product } from './product.entity';

/**
 * Export create product dto
 *
 * @class CreateProductDto
 * */
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  cost: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  amountAvailable: number;
}

/**
 * Export update product dto
 *
 * @class UpdateProductDto
 * */
export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  readonly productName: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  readonly cost: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  readonly amountAvailable: number;
}

/**
 * Export product response dto
 *
 * @class ProductResponseDto
 * */
export class ProductResponseDto extends PickType(Product, ['productName', 'cost', 'amountAvailable', 'seller']) {}
