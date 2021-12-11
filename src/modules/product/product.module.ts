// Dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { ProductController } from './product.controller';

// Services
import { ProductService } from './product.service';

// Entities
import { Product } from './product.entity';

/**
 * Export product module
 *
 * @module ProductModule
 * */
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
