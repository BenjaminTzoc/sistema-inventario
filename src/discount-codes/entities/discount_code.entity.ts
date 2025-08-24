import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum DiscountType {
    PERCENTAGE = 'percentage',
    FIXED = 'fixed',
}

export enum DiscountApplicableTo {
    PRODUCT = 'product',
    CATEGORY = 'category',
    SALE = 'sale',
}

@Entity('discount_codes')
export class DiscountCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column({ type: 'enum', enum: DiscountType })
    type: DiscountType;

    @Column({ type: 'numeric', precision: 12, scale: 2 })
    value: number;

    @Column({ type: 'timestamp' })
    start_date: Date;

    @Column({ type: 'timestamp' })
    end_date: Date;

    @Column({ type: 'int', nullable: true })
    max_usage: number;

    @Column({ type: 'enum', enum: DiscountApplicableTo })
    applicable_to: DiscountApplicableTo;

    @Column({ type: 'int', nullable: true })
    reference_id: number | null;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}