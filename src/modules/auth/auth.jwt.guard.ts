// Dependencies
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Export jwt auth guard
 *
 * @class JwtAuthGuard
 * @extends AuthGuard
 * */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
