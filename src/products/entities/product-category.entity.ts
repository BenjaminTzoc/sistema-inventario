import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UnitMeasure } from "./unit_measure.entity";

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

    @ManyToOne(() => UnitMeasure, { eager: true, nullable: false })
    default_unit_measure: UnitMeasure;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}