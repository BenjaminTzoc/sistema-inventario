import { ProductCategory } from "src/products/entities/product-category.entity";
import { PurchaseDetail } from "src/purchases/entities/purchase_detail.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UnitMeasure } from "./unit_measure.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductCategory, category => category.products, { eager: true, nullable: true })
    @JoinColumn({ name: 'categoryId' })
    category: ProductCategory;

    @OneToMany(() => PurchaseDetail, detail => detail.product)
    purchaseDetails: PurchaseDetail[];

    @Column({ unique: true })
    name: string;

    @Column({ unique: true, nullable: false })
    bar_code: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    price: number;
    
    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    stock: number;

    @ManyToOne(() => UnitMeasure, unit => unit.products, { eager: true, nullable: false })
    unit_measure: UnitMeasure;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}