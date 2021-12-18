// Dependencies
import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

// DTOs
import { BasicSuccessResponseDto, SuccessResponseDto } from '../../shared/DTOs/success-response.dto';
import { AuthResponseDto, LoginDataDto, RegisterDataDto, UpdateProfileDto } from './auth.dto';

// Constants
import { SUCCESS } from '../../shared/constants/strings.constants';

// Services
import { AuthService } from './auth.service';
import { JwtRequest } from './auth.types';
import { JwtAuthGuard } from './auth.jwt.guard';

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
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  async register(@Body() registerData: RegisterDataDto): Promise<SuccessResponseDto<AuthResponseDto>> {
    const resp = await this.authService.register(registerData);

    return {
      message: SUCCESS,
      data: resp,
    };
  }

  /**
   * @member me
   *
   * @param {JwtRequest} req
   *
   * @returns {Promise<SuccessResponseDto<AuthResponseDto>>}
   * */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'The route used by user to get me from token' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  async me(@Req() req: JwtRequest): Promise<SuccessResponseDto<AuthResponseDto>> {
    const resp = await this.authService.generateUserJwtToken(req.user);

    return {
      message: SUCCESS,
      data: resp,
    };
  }

  /**
   * @member updateProfile
   *
   * @param {UpdateProfileDto} updateProfileDto
   * @param {JwtRequest} req
   *
   * @returns {Promise<BasicSuccessResponseDto>}
   * */
  @Post('update-profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Update profile' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 201, description: 'Success', type: BasicSuccessResponseDto })
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req: JwtRequest,
  ): Promise<BasicSuccessResponseDto> {
    await this.authService.updateProfile(req.user.id, updateProfileDto);

    return {
      message: SUCCESS,
    };
  }
}
