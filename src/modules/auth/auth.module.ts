// Dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// Controllers
import { AuthController } from './auth.controller';

// Services
import { AuthService } from './auth.service';

// Strategy
import { JwtStrategy } from './auth.jwt.strategy';

// Entities
import { User } from '../users/users.entity';

// Constants
import { JWT_SECRET } from '../../shared/constants/global.constants';
import { UsersModule } from '../users/users.module';

/**
 * Export auth module
 *
 * @class AuthModule
 * */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    UsersModule,
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
