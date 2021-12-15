// Dependencies
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

// Interfaces
import { JwtUser } from './auth.types';

// Constants
import { Roles } from '../../shared/constants/global.constants';
import { INVALID_EMAIL, INVALID_ROLE } from '../../shared/constants/strings.constants';

/**
 * Export login user dto
 *
 * @class LoginDataDto
 * */
export class LoginDataDto {
  @IsEmail({}, { message: INVALID_EMAIL })
  @IsNotEmpty()
  @ApiProperty({ type: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  password: string;
}

/**
 * Export register user dto
 *
 * @class RegisterDataDto
 * */
export class RegisterDataDto {
  @IsEmail({}, { message: INVALID_EMAIL })
  @IsNotEmpty()
  @ApiProperty({ type: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  password: string;

  @IsEnum(Roles, { message: INVALID_ROLE })
  @IsNotEmpty()
  @ApiProperty({ type: 'enum', enum: Roles })
  role: Roles
}

/**
 * Export me dto
 *
 * @class MeDto
 * */
export class MeDataDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  token: string;
}

/**
 * Export auth response dto
 *
 * @class AuthResponseDto
 * */
export class AuthResponseDto {
  accessToken: string;
  user: JwtUser;
}
