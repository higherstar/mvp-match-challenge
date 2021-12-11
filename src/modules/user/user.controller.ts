// Dependencies
import {
  Controller,
  Req,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Users service
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

// DTOs
import { BasicSuccessResponseDto, SuccessResponseDto } from '../../shared/DTOs/success-response.dto';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './user.dto';

// Entities
import { User } from './user.entity';

// Interfaces
import { JwtRequest } from '../auth/auth.types';

// Constants
import { NOTHING_TO_UPDATE, SUCCESS, USER_SELF_DELETE } from '../../shared/constants/strings.constants';

/**
 * Export user controller
 *
 * @class UserController
 * */
@ApiTags('users')
@Controller('users')
export class UserController {
  /**
   * @constructor
   *
   * @param {UserService} userService
   * */
  constructor(private readonly userService: UserService) {}

  /**
   * @member create
   *
   * @param {CreateUserDto} createUserDto
   *
   * @returns {Promise<User>}
   * */
  @Post()
  @ApiOperation({ description: 'Create new user' })
  @ApiResponse({ status: 200, description: 'Success', type: UserResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Some of the fields are missing or invalid, or email is already used',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  /**
   * @member find
   *
   * @param {number} userId
   *
   * @returns {Promise<SuccessResponseDto<User>>}
   * */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Get a user details' })
  @ApiResponse({ status: 200, description: 'Success', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - The provided user id is missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to access the resource' })
  @ApiResponse({ status: 404, description: 'Not Found - Can not find a user by provided id' })
  async find(@Param('id', ParseIntPipe) userId: number): Promise<SuccessResponseDto<User>> {
    const user = await this.userService.findUserById(userId);

    return {
      message: SUCCESS,
      data: user,
    };
  }

  /**
   * @member update
   *
   * @param {number} userId
   * @param {UpdateUserDto} updateUserDto
   *
   * @returns {Promise<BasicSuccessResponseDto>}
   * */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Update user name, role or deposit' })
  @ApiResponse({ status: 200, description: 'Success', type: BasicSuccessResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - The provided user id is missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to access the resource' })
  @ApiResponse({ status: 404, description: 'Not Found - Can not find a user by provided id' })
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<BasicSuccessResponseDto> {
    if (Object.keys(updateUserDto).length === 0) {
      return { message: NOTHING_TO_UPDATE };
    }

    await this.userService.updateUser(userId, updateUserDto);

    return { message: SUCCESS };
  }

  /**
   * @member delete
   *
   * @param {number} userId
   * @param {JwtRequest} req
   *
   * @returns {Promise<BasicSuccessResponseDto>}
   * */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Success', type: BasicSuccessResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - The provided user id is missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to access the resource' })
  @ApiResponse({ status: 404, description: 'Not Found - Can not find a user by provided id' })
  async delete(@Param('id', ParseIntPipe) userId: number, @Req() req: JwtRequest): Promise<BasicSuccessResponseDto> {
    const isTheSameUser = req.user.id === userId;

    if (isTheSameUser) {
      throw new BadRequestException(USER_SELF_DELETE);
    }

    await this.userService.deleteUser(userId);

    return { message: SUCCESS };
  }
}
