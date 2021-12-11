// Dependencies
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { JwtUser } from './auth.types';

/**
 * Export login user dto
 *
 * @class LoginUserDTO
 * */
export class LoginUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
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
