// Dependencies
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// DTOs
import { SuccessResponseDto } from '../../shared/DTOs/success-response.dto';
import { AuthResponseDto, LoginUserDTO } from './auth.dto';

// Constants
import { SUCCESS } from '../../shared/constants/strings.constants';

// Services
import { AuthService } from './auth.service';

/**
 * Export auth controller
 *
 * @class AuthController
 * */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  /**
   * @constructor
   *
   * @param {AuthService} authService
   * */
  constructor(private readonly authService: AuthService) {}

  /**
   * @member login
   *
   * @param {LoginUserDTO} loginData
   *
   * @returns {Promise<SuccessResponseDto<AuthResponseDto>>}
   * */
  @Post('login')
  @ApiOperation({ description: 'The route used by user to get a new JWT token' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiResponse({ status: 401 })
  async login(@Body() loginData: LoginUserDTO): Promise<SuccessResponseDto<AuthResponseDto>> {
    const resp = await this.authService.login(loginData);

    return {
      message: SUCCESS,
      data: resp,
    };
  }
}
