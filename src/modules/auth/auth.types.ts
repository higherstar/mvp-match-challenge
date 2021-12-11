// Dependencies
import { Request } from '@nestjs/common';

// Constants
import { Roles } from '../../shared/constants/global.constants';

/**
 * Export jwt user interface
 *
 * @interface JwtUser
 * */
export interface JwtUser {
  id: number;
  role: Roles;
  email: string;
}

/**
 * Export jwt request interface
 *
 * @interface JwtRequest
 * @extends Request
 * */
export interface JwtRequest extends Request {
  user: JwtUser;
}
