// Dependencies
import { IsNotEmpty, IsNumber, IsEnum, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Constants
import { DepositAmount } from '../../shared/constants/global.constants';
import { INVALID_DEPOSIT_VALUE } from '../../shared/constants/strings.constants';

/**
 * Export deposit dto
 *
 * @class DepositDto
 * */
export class DepositDto {
  @IsEnum(DepositAmount, { message: INVALID_DEPOSIT_VALUE })
  @IsNotEmpty()
  @ApiProperty({ type: 'number', enum: DepositAmount })
  value: number;
}

/**
 * Export purchase dto
 *
 * @class ProductDto
 * */
export class ProductDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  quantity: number;
}

/**
 * Export purchase dto
 *
 * @class PurchaseDto
 * */
export class PurchaseDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: 'array' })
  products: ProductDto[];
}
