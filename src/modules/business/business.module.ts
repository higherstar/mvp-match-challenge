// Dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { BusinessController } from './business.controller';

// Services
import { BusinessService } from './business.service';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

// Entities
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

/**
 * Export business module
 *
 * @module BusinessModule
 * */
@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  controllers: [BusinessController],
  providers: [BusinessService, UserService, ProductService],
  exports: [],
})
export class BusinessModule {}
