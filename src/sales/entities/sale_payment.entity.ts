import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Sale } from "./sale.entity";
import { PaymentMethod } from "src/payment-methods/entities/payment_method.entity";
import { User } from "src/users/entities/user.entity";

@Entity('sale_payments')
export class SalePayment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Sale, sale => sale.payments, { onDelete: 'CASCADE' })
    sale: Sale;

    @ManyToOne(() => PaymentMethod, { eager: true })
    payment_method: PaymentMethod;

    @ManyToOne(() => User, { eager: true })
    user: User;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    payment_date: Date;

    @Column({ type: 'numeric', precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'text', nullable: true })
    notes: string | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}