// Dependencies
import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
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
  value;
}

/**
 * Export buy dto
 *
 * @class BuyDto
 * */
export class BuyDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  productId;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  productAmount;
}
