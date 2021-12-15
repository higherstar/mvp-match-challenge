// Dependencies
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// DTOs
import { SuccessResponseDto } from '../../shared/DTOs/success-response.dto';
import { AuthResponseDto, LoginDataDto, MeDataDto, RegisterDataDto } from './auth.dto';

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
   * @param {LoginDataDto} loginData
   *
   * @returns {Promise<SuccessResponseDto<AuthResponseDto>>}
   * */
  @Post('login')
  @ApiOperation({ description: 'The route used by user to login' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiResponse({ status: 401 })
  async login(@Body() loginData: LoginDataDto): Promise<SuccessResponseDto<AuthResponseDto>> {
    const resp = await this.authService.login(loginData);

    return {
      message: SUCCESS,
      data: resp,
    };
  }

  /**
   * @member register
   *
   * @param {RegisterDataDto} registerData
   *
   * @return {Promise<SuccessResponseDto<AuthResponseDto>>}
   * */
  @Post('register')
  @ApiOperation({ description: 'The route used by user to register user' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiResponse({ status: 401 })
  async register(@Body() registerData: RegisterDataDto): Promise<SuccessResponseDto<AuthResponseDto>> {
    const resp = await this.authService.register(registerData);

    return {
      message: SUCCESS,
      data: resp
    };
  }

  /**
   * @member me
   * */
  @Post('me')
  @ApiOperation({ description: 'The route used by user to get me' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiResponse({ status: 401 })
  async me(@Body() meData: MeDataDto) {
    const resp = await this.authService.me(meData);

    return {
      message: SUCCESS,
      data: resp
    }
  }
}
