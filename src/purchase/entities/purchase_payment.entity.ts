import { PaymentMethod } from "src/payment_methods/payment_method.entity";
import { Purchase } from "src/purchases/entities/purchase.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum PaymentStatus {
    PENDING = "pendiente",
    CONFIRMED = "confirmado",
    CANCELLED = "anulado",
}

@Entity("purchase_payments")
export class PurchasePayment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Purchase, purchase => purchase.payments, { onDelete: "CASCADE" })
    purchase: Purchase;

    @ManyToOne(() => PaymentMethod, { eager: true })
    payment_method: PaymentMethod;

    @ManyToOne(() => User, { eager: true })
    user: User;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    payment_date: Date;

    @Column({ type: "numeric", precision: 12, scale: 2 })
    amount: number;

    @Column({ type: "text", nullable: true })
    notes: string | null;

    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.CONFIRMED })
    status: PaymentStatus;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;
}