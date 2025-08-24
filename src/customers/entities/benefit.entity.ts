import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerCategory } from "./customer_category.entity";

export enum BenefitType {
    PERCENTAGE = 'percentage',
    FIXED = 'fixed',
    PTHER = 'other',
}

@Entity('benefits')
export class Benefit {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CustomerCategory, category => category.benefits, { nullable: false, onDelete: 'CASCADE' })
    customerCategory: CustomerCategory;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'enum', enum: BenefitType })
    type: BenefitType;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    value: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}