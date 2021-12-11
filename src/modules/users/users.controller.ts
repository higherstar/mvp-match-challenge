// Dependencies
import {
  Controller,
  Req,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Users service
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

// DTOs
import { BasicSuccessResponseDto } from '../../shared/DTOs/success-response.dto';
import { CreateUserDto, UserResponseDto } from './users.dto';

// Entities
import { User } from './users.entity';

// Interfaces
import { JwtRequest } from '../auth/auth.types';

// Constants
import { SUCCESS, USER_SELF_DELETE } from '../../shared/constants/strings.constants';

/**
 * Export users controller
 *
 * @class UsersController
 * */
@ApiTags('users')
@Controller('users')
export class UsersController {
  /**
   * @constructor
   *
   * @param {UsersService} usersService
   * */
  constructor(private readonly usersService: UsersService) {}

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
    return this.usersService.create(createUserDto);
  }

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

    await this.usersService.deleteUser(userId);

    return { message: SUCCESS };
  }
}
