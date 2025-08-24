import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerCategory } from "./customer_category.entity";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CustomerCategory, category => category.customers, { nullable: true, eager: true })
    category: CustomerCategory;

    @Column()
    name: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    credit_limit: number;

    @Column({ type: 'date', nullable: true })
    birth_date: Date | null;

    @Column({ type: 'text', nullable: true })
    notes: string | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}