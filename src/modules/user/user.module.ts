// Dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UserController } from './user.controller';

// Services
import { UserService } from './user.service';

// Subscribers
import { UserSubscriber } from './user.subscriber';

// Entities
import { User } from './user.entity';

/**
 * Export user module
 *
 * @module UserModule
 * */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
