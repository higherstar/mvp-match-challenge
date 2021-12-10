// Dependencies
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// Config
import config from './database/config/local';

// Modules
import { LoggerModule } from './modules/logger/logger.module';
import { UsersModule } from './modules/users/users.module';

// Validators
import { EntityExistValidator } from './shared/validators/entity-exist.validator';

// Services
import { SwaggerService } from './swagger/swagger.service';

/**
 * Export app module
 *
 * @module AppModule
 * */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config as TypeOrmModuleOptions),
    LoggerModule,
    UsersModule,
  ],
  controllers: [],
  providers: [EntityExistValidator, SwaggerService],
})
export class AppModule {}
