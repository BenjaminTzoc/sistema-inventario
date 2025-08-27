import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { UnitMeasure } from './entities/unit_measure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Product,
    ProductCategory,
    UnitMeasure,
  ])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
