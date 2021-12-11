// Dependencies
import { IsEmail, IsNumber, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

// Entities
import { User } from './users.entity';

// Constants
import { Roles } from '../../shared/constants/global.constants';
import { INVALID_ROLE } from '../../shared/constants/strings.constants';

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

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({ type: 'email' })
  readonly email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  readonly password: string;

  @IsOptional()
  @IsEnum(Roles, { message: INVALID_ROLE })
  readonly role: Roles;

  @IsOptional()
  @IsNumber()
  readonly deposit: number;
}

/**
 * Export user response dto
 *
 * @class UserResponseDto
 * */
export class UserResponseDto extends PickType(User, ['email', 'role', 'deposit']) {}
