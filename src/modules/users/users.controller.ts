// Dependencies
import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

// Users service
import { UsersService } from './users.service';

// DTOs
import { CreateUserDto, UserResponseDto } from './users.dto';

// Entities
import { User } from './users.entity';

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
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
