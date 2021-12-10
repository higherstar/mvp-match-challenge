// Dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// User controller
import { UsersController } from './users.controller';

// Services
import { UsersService } from './users.service';

// User entity
import { User } from './users.entity';

/**
 * Export users module
 *
 * @module UsersModule
 * */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
