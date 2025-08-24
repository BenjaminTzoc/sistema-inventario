import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SaleDetail } from "./sale_detail.entity";
import { SalePayment } from "./sale_payment.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { User } from "src/users/entities/user.entity";

export enum SaleStatus {
    PENDING = 'pendiente',
    COMPLETED = 'completada',
    CANCELLED = 'cancelada',
}

@Entity('sales')
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, { nullable: false, eager: true })
    customer: Customer;

    @ManyToOne(() => User, { nullable: false, eager: true })
    user: User;

    @OneToMany(() => SaleDetail, detail => detail.sale, { cascade: true })
    details: SaleDetail[];

    @OneToMany(() => SalePayment, payment => payment.sale, { cascade: true })
    payments: SalePayment[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    total: number;

    @Column({ type: 'enum', enum: SaleStatus, default: SaleStatus.PENDING })
    status: SaleStatus;

    @Column({ type: 'text', nullable: true })
    notes: string | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}