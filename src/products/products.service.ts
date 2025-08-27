import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { UnitMeasure } from './entities/unit_measure.entity';
import da from 'zod/v4/locales/da.js';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepo: Repository<ProductCategory>,
        @InjectRepository(UnitMeasure)
        private readonly unitMeasureRepo: Repository<UnitMeasure>,
    ) {}

    async createProduct(data: Partial<Product>): Promise<Product> {
        const existingBarCode = await this.productRepo.findOne({
            where: { bar_code: data.bar_code }
        });

        if (existingBarCode)
            throw new ConflictException('Ya existe un producto con este código');

        const existingName = await this.productRepo.findOne({
            where: { name: data.name }
        });
            
        if (existingName)
            throw new ConflictException('Ya existe un producto con este nombre');   

        if (data.category) {
            const existingCategory = await this.productCategoryRepo.findOne({
                where: { id: Number(data.category) }
            });
            
            if (!existingCategory)
                throw new NotFoundException('La categoría no existe');

            if (!data.unit_measure) {
                data.unit_measure = existingCategory.default_unit_measure;
            } else {
                const existingUnitMeasure = await this.unitMeasureRepo.findOne({
                    where: { id: Number(data.unit_measure) }
                })

                if (!existingUnitMeasure)
                    throw new NotFoundException('La unidad de medida no existe');
            }
        }

        const product = this.productRepo.create(data);
        const savedProduct = await this.productRepo.save(product);

        return this.getProduct(savedProduct.id);
    }

    async getAllProducts(includeDeleted: boolean = false): Promise<Product[]> {
        const products = await this.productRepo.find({
            withDeleted: includeDeleted,
        });

        return products.map(prod => ({
            ...prod,
            isDeleted: !!prod.deleted_at,
        }));
    }

    async getProduct(id: number): Promise<Product> {
        const product = await this.productRepo.findOne({ 
            where: {id},
            relations: ['category', 'unit_measure']
        });
        if (!product) throw new NotFoundException('Producto no encontrado');

        return product;
    }

    async createProductCategory(data: Partial<ProductCategory>): Promise<ProductCategory> {
        const duplicate = await this.productCategoryRepo.findOne({
            where: { name: data.name }
        });

        if (duplicate)
            throw new ConflictException('Ya existe una categoría con ese nombre');

        const unitMeasure = await this.unitMeasureRepo.findOne({ 
            where: { id: Number(data.default_unit_measure) } 
        });

        if (!unitMeasure) {
            throw new NotFoundException('La unidad de medida no existe');
        }

        const productCategory = this.productCategoryRepo.create({
            ...data,
            default_unit_measure: unitMeasure
        });

        return this.productCategoryRepo.save(productCategory);
    }

    async getAllProductCategories(includeDeleted: boolean = false): Promise<ProductCategory[]> {
        const productCategories = await this.productCategoryRepo.find({
            withDeleted: includeDeleted,
        });

        return productCategories.map(category => ({
            ...category,
            isDeleted: !!category.deleted_at,
        }))
    }

    // UNIDADES DE MEDIDA

    async createUnitMeasure(data: Partial<UnitMeasure>): Promise<UnitMeasure> {
        const duplicate = await this.unitMeasureRepo.findOne({
            where: [
                { name: data.name },
                { acronym: data.acronym },
            ],
        });

        if (duplicate) { throw new ConflictException('Ya existe una unidad de medida con ese nombre o acrónimo'); }

        const unitMeasure = this.unitMeasureRepo.create(data);
        return this.unitMeasureRepo.save(unitMeasure);
    }

    async getAllUnitMeasures(includeDeleted: boolean = false): Promise<UnitMeasure[]> {
        const unitMeasures = await this.unitMeasureRepo.find({
            withDeleted: includeDeleted,
            select: ['id', 'name', 'acronym', 'allow_decimals', 'description', 'deleted_at'],
        });

        return unitMeasures.map(unit => ({
            ...unit,
            isDeleted: !!unit.deleted_at,
        }));
    }

    async getUnitMeasure(id: number): Promise<UnitMeasure> {
        const unitMeasure = await this.unitMeasureRepo.findOne({ where: {id} });
        if (!unitMeasure) throw new NotFoundException('Unidad de medida no encontrada');
        
        return unitMeasure;
    }

    async updateUnitMeasure(id: number, data: Partial<UnitMeasure>): Promise<UnitMeasure> {
        const existing = await this.unitMeasureRepo.findOne({ where: {id} });
        if (!existing) throw new NotFoundException('Unidad de medida no encontrada');

        if (data.name || data.acronym) {
            const duplicate = await this.unitMeasureRepo.findOne({
                where: [
                    ...(data.name ? [{ name: data.name }] : []),
                    ...(data.acronym ? [{ acronym: data.acronym }] : []),
                ]
            });
            
            if (duplicate && duplicate.id !== id) 
                throw new ConflictException('Ya existe una unidad de medida con ese nombre o acrónimo');
        }

        await this.unitMeasureRepo.update(id, data);
        return this.getUnitMeasure(id);
    }

    async deleteUnitMeasure(id: number): Promise<void> {
        const existing = await this.unitMeasureRepo.findOne({ where: {id} });

        if (!existing)
            throw new NotFoundException('Unidad de medida no encontrada');

        await this.unitMeasureRepo.softDelete(id);
    }

    async restoreUnitMeasure(id: number): Promise<UnitMeasure> {
        const existing = await this.unitMeasureRepo.findOne({
            where: {id},
            withDeleted: true
        });

        if (!existing)
            throw new NotFoundException('Unidad de medida no encontrada');

        if (!existing.deleted_at)
            throw new ConflictException('La unidad de medida no está eliminada');

        await this.unitMeasureRepo.restore(id);
        return this.getUnitMeasure(id);
    }
}
