// Dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UsersController } from './users.controller';

// Services
import { UsersService } from './users.service';

// Subscribers
import { UsersSubscriber } from './users.subscriber';

// Entities
import { User } from './users.entity';

/**
 * Export users module
 *
 * @module UsersModule
 * */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersSubscriber],
  exports: [UsersService],
})
export class UsersModule {}
