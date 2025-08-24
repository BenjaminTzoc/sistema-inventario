import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UnitMeasure {
    POUND = 'lb',
    UNIT = 'unidad',
    KILOGRAM = 'kg',
    LITER = 'lt',
}

@Entity('product_categories')
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Product, product => product.category)
    products: Product[];

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'enum', enum: UnitMeasure, default: UnitMeasure.POUND })
    unit_measure: UnitMeasure;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}