// Dependencies
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, ForbiddenException, Post, Req, UseGuards } from '@nestjs/common';

// Services
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { BusinessService } from './business.service';
import { UserService } from '../user/user.service';

// Interfaces
import { JwtRequest } from '../auth/auth.types';

// Constants
import { Roles } from '../../shared/constants/global.constants';
import { SUCCESS, USER_NOT_BUY, USER_NOT_DEPOSIT } from '../../shared/constants/strings.constants';

// DTOs
import { BuyDto, DepositDto } from './business.dto';
import { BasicSuccessResponseDto } from '../../shared/DTOs/success-response.dto';

/**
 * Export business controller
 *
 * @class BusinessController
 * */
@ApiTags('business')
@Controller('business')
@UseGuards(JwtAuthGuard)
export class BusinessController {
  /**
   * @constructor
   *
   * @param {BusinessService} businessService
   * @param {UserService} userService
   * */
  constructor(private readonly businessService: BusinessService, private readonly userService: UserService) {}

  /**
   * @member deposit
   *
   *
   * @param {DepositDto} depositDto
   * @param {JwtRequest} req
   *
   * @returns {Promise<BasicSuccessResponseDto>}
   * */
  @Post('deposit')
  @ApiOperation({ description: 'Deposit only 5, 10, 20, 50 and 100 cent coins into their vending machine account' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request - Some of the fields are missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to deposit' })
  async deposit(@Body() depositDto: DepositDto, @Req() req: JwtRequest): Promise<BasicSuccessResponseDto> {
    const isBuyer = req.user.role === Roles.BUYER;

    if (!isBuyer) {
      throw new ForbiddenException(USER_NOT_DEPOSIT);
    }

    const deposit = await this.businessService.deposit(req.user, depositDto);

    return { message: `${SUCCESS} Your current deposit are ${deposit} cents` };
  }

  /**
   * @member reset
   *
   * @param {JwtRequest} req
   * */
  @Post('reset')
  @ApiOperation({ description: 'Reset deposit back to 0' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to deposit' })
  async reset(@Req() req: JwtRequest): Promise<BasicSuccessResponseDto> {
    const isBuyer = req.user.role === Roles.BUYER;

    if (!isBuyer) {
      throw new ForbiddenException(USER_NOT_DEPOSIT);
    }

    await this.businessService.reset(req.user.id);

    return { message: SUCCESS };
  }

  /**
   * @member buy
   *
   * @param {BuyDto[]} buyDtos
   * @param {JwtRequest} req
   * */
  @Post('buy')
  @ApiOperation({ description: 'Buy product' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to deposit' })
  async buy(@Body() buyDtos: BuyDto[], @Req() req: JwtRequest) {
    const isBuyer = req.user.role === Roles.BUYER;

    if (!isBuyer) {
      throw new ForbiddenException(USER_NOT_BUY);
    }

    return await this.businessService.buy(buyDtos, req.user);
  }
}
