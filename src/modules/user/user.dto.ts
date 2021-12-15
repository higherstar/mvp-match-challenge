// Dependencies
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

// Entities
import { User } from './user.entity';

// Constants
import { Roles } from '../../shared/constants/global.constants';
import { INVALID_ROLE } from '../../shared/constants/strings.constants';

/**
 * Export create user dto
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

  @IsEnum(Roles, { message: INVALID_ROLE })
  @IsNotEmpty()
  @ApiProperty({ type: 'enum', enum: Roles })
  role;
}

/**
 * Export update user dto
 *
 * @class UpdateUserDto
 * */
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
  @ApiProperty({ type: 'enum', enum: Roles })
  readonly role: Roles;
}

/**
 * Export user response dto
 *
 * @class UserResponseDto
 * */
export class UserResponseDto extends PickType(User, ['email', 'role', 'deposit']) {}
