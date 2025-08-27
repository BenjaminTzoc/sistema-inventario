import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateProductSchema } from './dto/product.dto';
import { CreateUnitMeasureSchema, UpdateUnitMeasureSchema } from './dto/unit-measure.dto';
import { CreateProductCategorySchema } from './dto/product-category.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    createProduct(@Body(new ZodValidationPipe(CreateProductSchema)) body: any) {
        return this.productsService.createProduct(body);
    }

    @Get()
    getAllProducts(@Query('includeDeleted') includeDeleted: boolean = false) {
        return this.productsService.getAllProducts(includeDeleted);
    }

    @Post('product_categories')
    createProductCategory(@Body(new ZodValidationPipe(CreateProductCategorySchema)) body: any) {
        return this.productsService.createProductCategory(body);
    }

    @Get('product_categories')
    getAllProductCategories(@Query('includeDeleted') includeDeleted: boolean = false) {
        return this.productsService.getAllProductCategories(includeDeleted);
    }

    @Post('unit_measures')
    createUnitMeasure(@Body(new ZodValidationPipe(CreateUnitMeasureSchema)) body: any) {
        return this.productsService.createUnitMeasure(body);
    }

    @Get('unit_measures')
    getAllUnitMeasures(@Query('includeDeleted') includeDeleted: boolean = false) {
        return this.productsService.getAllUnitMeasures(includeDeleted);
    }

    @Patch('unit_measures/:id')
    updateUnitMeasure(@Param('id') id: number, @Body(new ZodValidationPipe(UpdateUnitMeasureSchema)) body: any) {
        return this.productsService.updateUnitMeasure(id, body);
    }

    @Delete('unit_measures/:id')
    deleteUnitMeasure(@Param('id') id: number) {
        return this.productsService.deleteUnitMeasure(id);
    }

    @Patch('unit_measures/:id/restore')
    restoreUnitMeasure(@Param('id') id: number) {
        return this.productsService.restoreUnitMeasure(id);
    }
}
