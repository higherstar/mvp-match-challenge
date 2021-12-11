// Dependencies
import { IsEmail, IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

// Entities
import { User } from './users.entity';

// Constants
import { Roles } from '../../shared/constants/global.constants';

/**
 * Export create users dto
 *
 * @class CreateUserDto
 * */
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'email' })
  email;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  password;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'enum', enum: Roles })
  role;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  deposit;
}

/**
 * Export user response dto
 *
 * @class UserResponseDto
 * */
export class UserResponseDto extends PickType(User, ['email', 'role', 'deposit']) {}
