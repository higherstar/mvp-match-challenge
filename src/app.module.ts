// Dependencies
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// Config
import config from './database/config/local';

// Modules
import { LoggerModule } from './modules/logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';

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
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [],
  providers: [EntityExistValidator, SwaggerService],
})
export class AppModule {}
